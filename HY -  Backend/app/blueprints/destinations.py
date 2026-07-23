from flask import Blueprint, jsonify

from app.models.tour import Tour

destinations_bp = Blueprint("destinations", __name__)


@destinations_bp.get("")
def list_destinations():
    destinations = sorted({tour.destination for tour in Tour.query.filter_by(active=True).all() if tour.destination})
    return jsonify(destinations)
