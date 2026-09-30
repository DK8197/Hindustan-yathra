# Hindustan Yathra — Copilot Project Instructions

## Project at a glance

This workspace contains a travel-booking website, API, and tour-content artifacts:

- `frontend/`: Next.js 15 App Router, React 18, TypeScript (strict), Tailwind, next-intl, Zustand, React Three Fiber.
- `HY -  Backend/`: Flask API, SQLAlchemy, MySQL in the current Compose configuration, optional Redis, pytest.
- `Artifacts/South_india_5days/`: source tour Markdown, spreadsheets, generated workbooks, and a Jupyter notebook for tour/Excel preparation. Treat these as business content and source data; don't overwrite or regenerate them unless requested.

Read the target area before editing. Keep changes scoped to the relevant application; there is no root-level build/test command. Prefer existing patterns and dependencies over adding new ones.

## Frontend guidance

- Run frontend commands from `frontend/`. Use `npm run dev`, `npm run build`, `npm start`, and `npm run parse:excel -- <workbook-path>` as appropriate. `npm run lint` is declared, but verify it works with the installed Next.js version before relying on it. There is no test script currently defined in `package.json`.
- Public pages live under `src/app/[locale]/`; the operational admin UI is under `src/app/admin/`, outside the locale tree. API handlers are under `src/app/api/`.
- Locales are `en` and `kn`. Keep localized user-facing copy in `src/messages/en.json` and `src/messages/kn.json`. Respect the translated pathnames and typed navigation helpers in `src/i18n/routing.ts`; do not bypass them for localized links/routes.
- Use the existing shared types in `src/types/`. For tour reads, preserve the repository seam in `src/lib/tours-repository.ts` rather than introducing ad-hoc data access in pages/components. The Excel parser is `scripts/parse-excel.ts`; inspect its expected sheet/column contract before changing it.
- Prefer server components/data loading for server-rendered pages and keep client components limited to interactive browser behavior. Preserve accessibility, responsive styling, and reduced-motion support when changing UI or animation.
- Environment variables and credentials are secrets. Never expose server-only values through `NEXT_PUBLIC_*`, log them, or include them in commits/examples. Follow the established server-side proxy pattern for calls to Flask and validate request data at API boundaries.

## Backend guidance

- Run backend commands from `HY -  Backend/`. Dependencies are in `requirements.txt`; tests use `pytest -q`. The GitHub Actions workflow targets Python 3.12 and runs `pip install -r requirements.txt` then `pytest -q`.
- `app/__init__.py` owns `create_app()`, shared Flask extensions, and blueprint registration. Endpoints are grouped in `app/blueprints/` and `app/blueprints_admin/`; business logic belongs in `app/services/`; ORM models and request schemas are in `app/models/` and `app/schemas/`.
- The current `docker-compose.yml` provisions MySQL 8.4 and Redis 7. The architecture document mentions PostgreSQL, but verify executable configuration and runtime code rather than assuming docs are synchronized. Backend integration uses `API_SECRET` / `X-App-Key`; use environment configuration and never hard-code or print key material.
- Preserve the existing API response and model contracts unless the corresponding frontend consumers and tests are updated together. Add/update pytest coverage for backend behavior changes. Avoid schema changes without an accompanying migration/data-compatibility review.

## Cross-cutting cautions

- This repository contains evolving scaffold code and duplicated/inconsistent implementations. README descriptions can be aspirational or stale: inspect the actual route, caller, model, and configuration before relying on claims about persistence, authentication, OTP delivery, caching, or production readiness.
- Frontend API handlers often proxy requests to Flask, and the backend's registered URL prefixes are in `app/__init__.py`. Check both sides when changing an endpoint or payload.
- Treat authentication, admin access, uploads, and secrets as security-sensitive. Existing cookie names, auth flows, and middleware checks are not uniform; verify the complete request/authorization path rather than treating presence of a cookie as proof of authorization. Do not weaken validation, password/token handling, rate limits, or upload protections.
- Tour data exists in both generated JSON/artifacts and backend persistence. Confirm which path the affected runtime actually uses before editing data or changing the importer.
- Keep Kannada text/Unicode intact. Avoid broad formatting or generated-file churn unrelated to the requested change.
- Before finishing, run the narrowest relevant checks (frontend build/type-check or backend tests) and report any checks that could not run or any unrelated existing failures. Never claim a check passed unless it was run.
