# Hindustan Yathra Backend

This repository contains a Flask backend skeleton for Hindustan Yathra with:

- JWT-based authentication
- OTP login flow
- Tour management API
- Excel upload endpoint
- Redis-backed caching hooks
- Docker and Nginx deployment scaffolding

## Quick Start

1. Create a virtual environment and install dependencies.
2. Run `pytest`.
3. Start the stack with `docker compose up --build`.

## Production deployment

For Google Cloud Run deployment with Cloud SQL and Secret Manager, follow the
[Cloud Run deployment guide](docs/cloud-run-deployment.md). Review its
production-readiness warnings before exposing the API publicly.

The guide also covers the GitHub Actions CI/CD workflow at
[.github/workflows/backend-cloud-run.yml](../.github/workflows/backend-cloud-run.yml),
including the required GitHub variables and Google Cloud Workload Identity Federation setup.

## API Summary

- `POST /api/v1/auth/login`
- `POST /api/v1/auth/verify`
- `POST /api/v1/auth/refresh`
- `GET /api/v1/tours`
- `POST /api/v1/tours`
- `POST /api/v1/excel/upload`
- `GET /health`
