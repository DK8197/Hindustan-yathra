from flask import Blueprint, jsonify

admin_bp = Blueprint("admin", __name__)


@admin_bp.get("/dashboard")
def dashboard():
    return jsonify({"message": "admin dashboard"})
