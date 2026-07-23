from flask import Blueprint, jsonify, request
from flask_jwt_extended import (
    create_access_token,
    create_refresh_token,
    set_access_cookies,
    set_refresh_cookies,
)
import os

auth_admin_bp = Blueprint(
    "admin_auth",
    __name__,
    url_prefix="/api/v1/adminauth",
)

ADMIN_MOBILE = os.environ.get("ADMIN_MOBILE")
ADMIN_PASSWORD = os.environ.get("ADMIN_PASSWORD")


@auth_admin_bp.post("/login")
def login():
    data = request.get_json(silent=True) or {}

    mobile = str(data.get("mobile", "")).strip()
    password = str(data.get("password", "")).strip()

    if (
        mobile != ADMIN_MOBILE
        or password != ADMIN_PASSWORD
    ):
        return (
            jsonify(
                {
                    "success": False,
                    "message": "Invalid credentials",
                }
            ),
            401,
        )

    access_token = create_access_token(
        identity="admin"
    )

    refresh_token = create_refresh_token(
        identity="admin"
    )

    response = jsonify(
        {
            "success": True,
            "access_token": access_token,
            "refresh_token": refresh_token,
            "user": {
                "id": 1,
                "phone": ADMIN_MOBILE,
                "role": "admin",
            },
        }
    )

    set_access_cookies(response, access_token)
    set_refresh_cookies(response, refresh_token)

    return response, 200


@auth_admin_bp.post("/logout")
def logout():
    response = jsonify(
        {
            "success": True,
            "message": "Logged out",
        }
    )

    response.delete_cookie("access_token_cookie")
    response.delete_cookie("refresh_token_cookie")

    return response, 200