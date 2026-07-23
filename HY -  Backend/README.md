# Hindustan Yathra Backend

This repository contains a production-ready Flask backend skeleton for Hindustan Yathra with:

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

## API Summary

- `POST /api/v1/auth/login`
- `POST /api/v1/auth/verify`
- `POST /api/v1/auth/refresh`
- `GET /api/v1/tours`
- `POST /api/v1/tours`
- `POST /api/v1/excel/upload`
- `GET /health`
