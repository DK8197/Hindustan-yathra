import os
import secrets
import warnings
from datetime import datetime, timedelta, timezone

import jwt
from flask import request

if hasattr(jwt, "InsecureKeyLengthWarning"):
    warnings.filterwarnings("ignore", category=jwt.InsecureKeyLengthWarning)


def create_token(subject: int, token_type: str):
    now = datetime.now(timezone.utc)
    ttl = timedelta(minutes=30) if token_type == "access" else timedelta(days=7)
    payload = {"sub": subject, "type": token_type, "iat": int(now.timestamp()), "exp": int((now + ttl).timestamp())}
    return jwt.encode(payload, os.getenv("JWT_SECRET_KEY", "dev-secret"), algorithm="HS256")


def get_client_ip():
    return request.headers.get("X-Forwarded-For", request.remote_addr or "unknown")


def generate_csrf_token():
    return secrets.token_urlsafe(32)
