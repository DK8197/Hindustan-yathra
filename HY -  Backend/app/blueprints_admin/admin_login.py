from flask import request, jsonify, Blueprint
import os
from flask_jwt_extended import (
    create_access_token,
    create_refresh_token,
    set_access_cookies,
    set_refresh_cookies
)

auth_admin_bp = Blueprint("admin_auth", __name__)


@auth_admin_bp.post('/login')
def login():
    data = request.get_json()

    mobile = data.get('mobile')
    password = data.get('password')

    if (
        mobile != '8197272804'
        or password != 'admin123'
    ):
        return jsonify({
            'message': 'Invalid credentials'
        }), 401

    access_token = create_access_token(
        identity='admin'
    )

    refresh_token = create_refresh_token(
        identity='admin'
    )

    return jsonify({
        'access_token': access_token,
        'refresh_token': refresh_token,
        'user': {
            'role': 'admin'
        }
    }), 200

