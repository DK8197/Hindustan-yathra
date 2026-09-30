# Deploy the HY backend to Google Cloud Run

This guide deploys the Flask API container in this directory to Cloud Run,
connects it to Cloud SQL for MySQL, and injects credentials from Secret Manager.
Commands are written for **Windows PowerShell** and run from the backend folder.

> **Production-readiness warning:** this is a deployment recipe, not a claim
> that the current application is production-hardened. Complete the blockers in
> [Before production](#before-production) before sending real traffic or
> storing real customer data.

## 1. Prerequisites and names

Install and initialize the [Google Cloud CLI](https://cloud.google.com/sdk/docs/install),
sign in, select a billable GCP project, and enable billing. Choose one region for
Cloud Run and Cloud SQL, ideally close to the frontend and users. Replace the
example identifiers below with your own values:

```powershell
$PROJECT_ID = "your-gcp-project-id"
$REGION = "asia-south1"
$SERVICE = "hy-backend"
$REPOSITORY = "hy-backend"
$SQL_INSTANCE = "hy-mysql"
$RUNTIME_SA = "hy-backend-runtime"
gcloud config set project $PROJECT_ID
gcloud config set run/region $REGION
```

From the repository root, enter the backend directory (the path contains two
spaces between `-` and `Backend`):

```powershell
Set-Location "HY -  Backend"
```

Enable the required APIs:

```powershell
gcloud services enable run.googleapis.com cloudbuild.googleapis.com artifactregistry.googleapis.com sqladmin.googleapis.com secretmanager.googleapis.com
```

## 2. Create the Cloud SQL database

In **Google Cloud Console → Cloud SQL → Create instance**:

1. Select **MySQL**, version **8.4** (or a version supported by your project),
   and the same region selected above.
2. Create a dedicated application database named `hindustanyatra` after the
   instance is ready. In **Users**, create a dedicated non-root database user
   and generate a strong unique password.
3. For production, enable automated backups and point-in-time recovery. Use
   high availability for services that require regional failover; a zonal
   instance is cheaper but is not highly available.
4. The Cloud Run-to-Cloud SQL attachment below uses Cloud SQL's authenticated
   connection and Unix socket. A Cloud SQL public IP can be used with this
   integration without opening authorized networks to the internet. A
   private-IP-only instance additionally requires Cloud Run VPC egress and
   private networking; configure that networking before using this guide's
   deploy command. Never authorize `0.0.0.0/0` to the database.

Record the instance connection name shown on the instance overview. It has the
form `PROJECT_ID:REGION:INSTANCE_ID`. Do not use a root account in the app.

## 3. Store configuration in Secret Manager

Create these secrets in **Google Cloud Console → Security → Secret Manager**;
add each secret's value as a new version, without committing it to the
repository, a shell command, or a build argument:

| Secret ID | Value / purpose |
| --- | --- |
| `hy-api-secret` | A newly generated random value for the backend's `X-App-Key` check. The frontend server must use the same value. |
| `hy-flask-secret` | A unique random Flask `SECRET_KEY`. |
| `hy-jwt-secret` | A separate unique random `JWT_SECRET_KEY`. |
| `hy-admin-mobile` | Admin login mobile number. |
| `hy-admin-password` | A strong, unique admin password. |
| `hy-database-uri` | Full SQLAlchemy connection URI described below. |

The database URI must use the Cloud SQL Unix socket and the database user you
created. Replace the placeholders; URL-encode reserved characters in the
username/password (especially `@`, `:`, `/`, `?`, `#`, and `%`):

```text
mysql+pymysql://DB_USER:URL_ENCODED_PASSWORD@/hindustanyatra?unix_socket=/cloudsql/PROJECT_ID:REGION:INSTANCE_ID
```

Do not use the local `.env` database URI or its credentials. If R2-backed media
is used, create additional secrets for `R2_ACCOUNT_ID`, `R2_ACCESS_KEY_ID`, and
`R2_SECRET_ACCESS_KEY`; `R2_BUCKET` and `R2_PUBLIC_URL` can be ordinary
non-secret environment variables. Configure these only if the deployed code
uses the corresponding R2 features.

## 4. Create a least-privilege runtime identity

```powershell
gcloud iam service-accounts create $RUNTIME_SA --display-name="HY Cloud Run backend"
$RUNTIME_EMAIL = "$RUNTIME_SA@$PROJECT_ID.iam.gserviceaccount.com"
gcloud projects add-iam-policy-binding $PROJECT_ID --member="serviceAccount:$RUNTIME_EMAIL" --role="roles/cloudsql.client"
```

Grant this identity access to each secret listed in the deploy command below.
Repeat the following command, replacing the secret ID each time:

```powershell
gcloud secrets add-iam-policy-binding hy-api-secret --member="serviceAccount:$RUNTIME_EMAIL" --role="roles/secretmanager.secretAccessor"
```

Do not grant Secret Manager access to the whole project if per-secret grants
are practical. Cloud Build also needs permission to push images to the
Artifact Registry repository; if the build reports a permission error, grant
the active Cloud Build build identity `roles/artifactregistry.writer` on that
repository.

## 5. Build and publish the container

Create a Docker Artifact Registry repository once:

```powershell
gcloud artifacts repositories create $REPOSITORY --repository-format=docker --location=$REGION --description="HY backend images"
```

The backend Dockerfile runs Gunicorn on `0.0.0.0:8080`, which matches Cloud
Run's configured port below. The `.dockerignore` excludes local `.env` files,
virtual environments, and local data from the Cloud Build context. Build from
the backend directory using a unique release tag:

```powershell
$IMAGE = "$REGION-docker.pkg.dev/$PROJECT_ID/$REPOSITORY/api:release-001"
gcloud builds submit --tag $IMAGE .
```

Change the tag for each release. Never pass secrets using Docker build
arguments or include `.env` in the build context.

## 6. Deploy the Cloud Run service

Make sure each Secret Manager secret exists and the runtime service account can
access it. Deploy with public Cloud Run invocation because the Next.js server
calls this API; the Flask application currently applies its own `X-App-Key`
check. Cloud Run IAM authentication is not interchangeable with that header.

```powershell
$INSTANCE_CONNECTION_NAME = "$PROJECT_ID`:$REGION`:$SQL_INSTANCE"
gcloud run deploy $SERVICE --image $IMAGE --region $REGION --platform managed --port 8080 --service-account $RUNTIME_EMAIL --add-cloudsql-instances $INSTANCE_CONNECTION_NAME --allow-unauthenticated --min 0 --max 5 --concurrency 20 --set-env-vars "FLASK_ENV=production,UPLOAD_FOLDER=/tmp/hindustanyathra/uploads" --set-secrets "API_SECRET=hy-api-secret:1,SECRET_KEY=hy-flask-secret:1,JWT_SECRET_KEY=hy-jwt-secret:1,ADMIN_MOBILE=hy-admin-mobile:1,ADMIN_PASSWORD=hy-admin-password:1,SQLALCHEMY_DATABASE_URI=hy-database-uri:1"
```

If using R2, add secret references and the non-secret R2 environment variables
to this deployment. The Cloud Run filesystem is ephemeral: `/tmp` uploads can
disappear when an instance stops and are not shared between instances. Store
durable uploads in object storage instead.

For controlled rollouts, pin secrets to numeric versions instead of `latest`
in `--set-secrets`. When rotating a value, add a new secret version, update the
corresponding mapping to that version number, and deploy a new revision. Do not
assume existing instances refresh a secret value in place.

## 7. Verify the deployment

Get the service URL and inspect the latest revision:

```powershell
$SERVICE_URL = gcloud run services describe $SERVICE --region $REGION --format="value(status.url)"
$SERVICE_URL
gcloud run services describe $SERVICE --region $REGION --format="yaml(status.latestReadyRevisionName,status.conditions)"
```

The current Flask `before_request` hook protects **all** paths, including
`/health`, with `X-App-Key`. Therefore a plain browser request to `/health`
returns `403`; this is not a Cloud Run startup failure. A trusted operator who
has Secret Manager access can verify it from PowerShell without typing the
secret into the command or printing it:

```powershell
$APP_SECRET = (gcloud secrets versions access 1 --secret=hy-api-secret | Out-String).Trim()
Invoke-RestMethod -Uri "$SERVICE_URL/health" -Headers @{ "X-App-Key" = $APP_SECRET }
$APP_SECRET = $null
```

Alternatively, use a trusted API client to send the `X-App-Key` header, or
change the app to exempt a non-sensitive health route before configuring
unauthenticated probes. Check **Cloud Run → Logs** for startup errors and
database connection failures; never log or paste a secret into the log viewer
or a ticket.

For a database check, call an endpoint that reads/writes the database using a
trusted client and a test record. Confirm that the app is connected to the
Cloud SQL instance, not a local SQLite file or a development database.

## 8. Connect the frontend

Set the deployed service URL in the frontend's hosting environment. Existing
frontend code uses `NEXT_PUBLIC_API_URL` in several places and
`BACKEND_API_URL` in auth proxy routes; inspect each consumer before release and
set both to the Cloud Run URL where required. Do not put the API key in a
`NEXT_PUBLIC_*` variable. Set the matching `API_SECRET` only as a server-side
secret in the frontend hosting provider, then redeploy the frontend. The API
key must match the Cloud Run `API_SECRET` secret.

## 9. Operations

- Review Cloud Run request/error logs, Cloud SQL metrics, and billing after
  initial traffic. Set budgets and alerts in Cloud Billing.
- Keep `--max` bounded to control cost and Cloud SQL connection pressure. Each
  Gunicorn worker/Cloud Run instance can consume database connections; size the
  pool and instance limits together before increasing concurrency or scale.
- Cloud Run instances are stateless and may scale to zero. Do not rely on
  process memory for durable data, sessions, caches, or rate-limit state.
- The current app's in-memory Redis fallback and default limiter storage are
  instance-local. If shared caching or rate limiting is required, configure a
  supported shared Redis service and verify the app's Redis integration before
  setting production traffic.
- For a release, build a new immutable image tag, deploy it, smoke-test the new
  revision, then shift traffic or roll back using Cloud Run revisions.
- To roll back, select a known-good revision in Cloud Run, or route traffic to
  it with `gcloud run services update-traffic`.
- Back up Cloud SQL and test restoring a backup. Cloud Run container images are
  disposable; persistent business data belongs in Cloud SQL/object storage.

## GitHub Actions CI/CD

The repository workflow at
[`../.github/workflows/backend-cloud-run.yml`](../.github/workflows/backend-cloud-run.yml)
runs `pytest -q` on pull requests and deploys after a successful test run when
changes are pushed to `main` (or the workflow is manually run on `main`). The
tests use an in-memory SQLite database; this does not test the Cloud SQL
connection. Deployment builds the backend directory with Cloud Build, tags the
image with the commit SHA, and deploys a new Cloud Run revision. It uses
Workload Identity Federation (OIDC), not a downloaded service-account JSON key.

### Configure GitHub-to-Google authentication

Create a dedicated GitHub deployer service account and a Workload Identity
Federation pool/provider restricted to your GitHub repository and the `main`
branch. Example commands below are PowerShell; replace `OWNER/REPOSITORY` with
the exact GitHub owner and repository name:

```powershell
$POOL = "github-actions"
$PROVIDER = "github"
$DEPLOY_SA = "hy-github-deployer"
$OWNER_REPO = "OWNER/REPOSITORY"
$PROJECT_NUMBER = gcloud projects describe $PROJECT_ID --format="value(projectNumber)"
$DEPLOY_EMAIL = "$DEPLOY_SA@$PROJECT_ID.iam.gserviceaccount.com"

gcloud iam service-accounts create $DEPLOY_SA --display-name="HY GitHub deployer"
gcloud iam workload-identity-pools create $POOL --project=$PROJECT_ID --location=global --display-name="GitHub Actions"
gcloud iam workload-identity-pools providers create-oidc $PROVIDER --project=$PROJECT_ID --location=global --workload-identity-pool=$POOL --display-name="GitHub main branch" --issuer-uri="https://token.actions.githubusercontent.com" --attribute-mapping="google.subject=assertion.sub,attribute.repository=assertion.repository" --attribute-condition="assertion.repository == '$OWNER_REPO' && assertion.ref == 'refs/heads/main'"

$PROVIDER_RESOURCE = "projects/$PROJECT_NUMBER/locations/global/workloadIdentityPools/$POOL/providers/$PROVIDER"
$GITHUB_PRINCIPAL = "principalSet://iam.googleapis.com/projects/$PROJECT_NUMBER/locations/global/workloadIdentityPools/$POOL/attribute.repository/$OWNER_REPO"
gcloud iam service-accounts add-iam-policy-binding $DEPLOY_EMAIL --project=$PROJECT_ID --role="roles/iam.workloadIdentityUser" --member=$GITHUB_PRINCIPAL
gcloud projects add-iam-policy-binding $PROJECT_ID --member="serviceAccount:$DEPLOY_EMAIL" --role="roles/run.admin"
gcloud projects add-iam-policy-binding $PROJECT_ID --member="serviceAccount:$DEPLOY_EMAIL" --role="roles/cloudbuild.builds.editor"
gcloud iam service-accounts add-iam-policy-binding $RUNTIME_EMAIL --project=$PROJECT_ID --member="serviceAccount:$DEPLOY_EMAIL" --role="roles/iam.serviceAccountUser"
```

Grant the Cloud Build execution service account `roles/artifactregistry.writer`
on the Artifact Registry repository. Identify the build identity used by your
project in Cloud Build settings/build logs; Google Cloud projects can use
different default build identities. The Cloud Run runtime service account also
needs `roles/cloudsql.client` and `roles/secretmanager.secretAccessor` on each
secret referenced by the deployment. Avoid broad project-level secret access
when per-secret grants are available.

### Set GitHub repository variables

In **GitHub → repository → Settings → Secrets and variables → Actions →
Variables**, add:

| Variable | Value |
| --- | --- |
| `GCP_PROJECT_ID` | GCP project ID. |
| `GCP_REGION` | Same region as the Artifact Registry repository and Cloud Run service. |
| `GCP_ARTIFACT_REPOSITORY` | Artifact Registry Docker repository name. |
| `GCP_RUN_SERVICE` | Cloud Run service name. |
| `GCP_RUNTIME_SERVICE_ACCOUNT` | Full runtime service-account email, for example `hy-backend-runtime@PROJECT_ID.iam.gserviceaccount.com`. |
| `GCP_CLOUDSQL_INSTANCE` | Full Cloud SQL connection name: `PROJECT_ID:REGION:INSTANCE_ID`. |
| `GCP_WORKLOAD_IDENTITY_PROVIDER` | Full provider resource name, `projects/PROJECT_NUMBER/locations/global/workloadIdentityPools/POOL/providers/PROVIDER`. |
| `GCP_DEPLOY_SERVICE_ACCOUNT` | Full email of the GitHub deployer service account. |

No GCP JSON key or application secret is required in GitHub. The workflow
references the Secret Manager secret IDs and version `1` from the preceding
sections; create those versions before the first deployment. When rotating a
secret, update the corresponding numeric version in the workflow and push the
change through `main` to create a new revision. The separate frontend hosting
environment still needs the matching server-side `API_SECRET`.

## Before production

Address these code/security issues before using real user data:

1. **Rotate existing credentials.** The backend `.env` currently contains
   credential values. Treat them as compromised, rotate the API key, admin
   credentials, JWT/Flask keys, database credentials, and any R2 keys, and
   inspect repository history and previously built images. `.dockerignore`
   prevents future build contexts from including `.env`; it does not remove
   credentials from Git history or existing images.
2. **Remove secret logging and enforce required configuration.** The request
   hook prints the incoming `X-App-Key`, and if `API_SECRET` is unset, a
   missing header compares equal to the unset secret. Remove the header print
   and fail application startup if required secrets are absent.
3. **Remove development fallbacks.** `SECRET_KEY` and `JWT_SECRET_KEY` default
   to `dev-secret`. Refuse startup in production if either is missing.
4. **Harden browser authentication.** JWT cookies are currently configured
   with `JWT_COOKIE_SECURE=False` and CSRF protection disabled. Use HTTPS-only
   secure cookies, enable/validate CSRF protection, and test the frontend
   login flow before deployment.
5. **Restrict CORS.** The current API allows `*` origins. Set the actual
   website/admin origins and required headers/methods; do not use wildcard
   origins with credentialed browser requests.
6. **Use managed schema migrations.** `create_app()` currently calls
   `db.create_all()` during startup, and the migrations directory has no
   checked-in revision scripts. Create and review migrations, apply them as a
   controlled release step, and remove automatic schema creation from web
   startup before relying on Cloud SQL for production data.
7. **Fix readiness/health behavior.** `/health` is currently subject to the
   app-key guard. Make a minimal non-sensitive readiness route available to
   Cloud Run probes and distinguish process readiness from database health.
8. **Review application limits and uploads.** Configure shared rate-limit
   storage if scaling beyond one instance, validate upload size/content, and
   move durable uploaded files to object storage.

## Troubleshooting

| Symptom | Check |
| --- | --- |
| Revision fails to start / no listener | Container must bind `0.0.0.0:8080`; inspect Gunicorn and Cloud Run logs. |
| Cloud SQL connection refused or socket missing | Confirm `--add-cloudsql-instances`, exact instance connection name, `roles/cloudsql.client`, database URI socket path, and secret access. |
| Database access denied | Verify database/user/password and URL-encode reserved password characters in the URI. Do not use the root account. |
| Requests return `403` | Send the matching `X-App-Key`; verify `API_SECRET` exists in both services. A missing backend secret currently creates an unsafe bypass and must be fixed. |
| `/health` returns `403` | Expected with the current global app-key guard. Use a trusted client with the header or fix the health-route exemption. |
| Build contains local files / secrets | Stop deployment, rotate exposed values, inspect `.dockerignore` and build context, and remove exposed credentials from image/repository history. |