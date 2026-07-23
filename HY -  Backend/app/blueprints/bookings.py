from flask import Blueprint, jsonify, request

bookings_bp = Blueprint("bookings", __name__)


@bookings_bp.post("")
def create_booking():
    payload = request.get_json(silent=True) or {}
    return jsonify({"message": "booking received", "payload": payload}), 201
