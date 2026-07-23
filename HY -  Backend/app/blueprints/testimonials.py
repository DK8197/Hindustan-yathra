from flask import Blueprint, jsonify

testimonials_bp = Blueprint("testimonials", __name__)


@testimonials_bp.get("")
def list_testimonials():
    return jsonify([
        {"id": 1, "name": "Traveler", "message": "Excellent experience"}
    ])
