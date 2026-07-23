from flask import Blueprint, jsonify, request

from app import db, limiter, redis_client
from app.models.tour import Tour

details_bp = Blueprint("details", __name__)


@details_bp.get("")
@limiter.limit("60 per minute")
def list_tours():
    tours = Tour.query.filter_by(active=True).all()
    return jsonify([tour.to_dict() for tour in tours])


@details_bp.post("")
def create_tour():
    payload = request.get_json(silent=True) or {}
    tour = Tour(
        title=payload.get("title", "Untitled"),
        slug=payload.get("slug", "untitled"),
        category=payload.get("category"),
        duration_days=payload.get("duration_days", 1),
        destination=payload.get("destination"),
        short_description=payload.get("short_description"),
        price=payload.get("price"),
        active=payload.get("active", True),
        published=payload.get("published", False),
        language=payload.get("language", "en"),
    )
    db.session.add(tour)
    db.session.commit()
    redis_client.delete("tours:all")
    return jsonify(tour.to_dict()), 201


@details_bp.get("/<string:tour_id>")
def get_tour(tour_id):
    tour = Tour.query.filter_by(slug=tour_id).first_or_404()
    return jsonify(tour.to_dict())