import os

import jwt
from flask import Blueprint, jsonify, request
from werkzeug.security import check_password_hash, generate_password_hash

from app import db, limiter
from app.core.security import create_token
from app.models.user import User

auth_bp = Blueprint("auth", __name__)


def _get_phone(payload):
    return (payload.get("phone") or payload.get("mobile") or "").strip()


@auth_bp.post("/login")
@limiter.limit("10 per minute")
def login():
    payload = request.get_json(silent=True) or {}
    phone = _get_phone(payload)
    password = (payload.get("password") or "").strip()
    if not phone or not password:
        return jsonify({"error": "phone and password are required"}), 400

    user = User.query.filter_by(phone=phone).first()
    if not user:
        user = User(phone=phone, name="", role="customer")
        db.session.add(user)

    if not user.password_hash:
        user.password_hash = generate_password_hash(password)
        db.session.commit()
    elif not check_password_hash(user.password_hash, password):
        return jsonify({"error": "invalid credentials"}), 401

    access_token = create_token(user.id, "access")
    refresh_token = create_token(user.id, "refresh")
    return jsonify({"access_token": access_token, "refresh_token": refresh_token, "user": user.to_dict()})


@auth_bp.post("/verify")
@limiter.limit("10 per minute")
def verify():
    payload = request.get_json(silent=True) or {}
    phone = _get_phone(payload)
    password = (payload.get("password") or "").strip()
    if not phone or not password:
        return jsonify({"error": "phone and password are required"}), 400

    user = User.query.filter_by(phone=phone).first()
    if not user or not user.password_hash or not check_password_hash(user.password_hash, password):
        return jsonify({"error": "invalid credentials"}), 401

    access_token = create_token(user.id, "access")
    refresh_token = create_token(user.id, "refresh")
    return jsonify({"access_token": access_token, "refresh_token": refresh_token, "user": user.to_dict()})


@auth_bp.get("/me")
def me():
    auth_header = request.headers.get("Authorization", "")
    token = auth_header.replace("Bearer ", "", 1).strip() if auth_header.startswith("Bearer ") else None
    if not token:
        return jsonify({"error": "authorization required"}), 401

    try:
        decoded = jwt.decode(token, os.getenv("JWT_SECRET_KEY", "dev-secret"), algorithms=["HS256"])
    except jwt.ExpiredSignatureError:
        return jsonify({"error": "access token expired"}), 401
    except jwt.InvalidTokenError:
        return jsonify({"error": "invalid access token"}), 401

    if decoded.get("type") != "access":
        return jsonify({"error": "invalid token type"}), 401

    user = User.query.get(decoded.get("sub"))
    if not user:
        return jsonify({"error": "user not found"}), 404

    return jsonify({"user": user.to_dict()})


@auth_bp.post("/refresh")
def refresh():
    payload = request.get_json(silent=True) or {}
    token = payload.get("refresh_token")
    if not token:
        return jsonify({"error": "refresh_token is required"}), 400

    try:
        decoded = jwt.decode(token, os.getenv("JWT_SECRET_KEY", "dev-secret"), algorithms=["HS256"])
    except jwt.ExpiredSignatureError:
        return jsonify({"error": "refresh token expired"}), 401
    except jwt.InvalidTokenError:
        return jsonify({"error": "invalid refresh token"}), 401

    user = User.query.get(decoded.get("sub"))
    if not user:
        return jsonify({"error": "user not found"}), 404

    access_token = create_token(user.id, "access")
    return jsonify({"access_token": access_token})
