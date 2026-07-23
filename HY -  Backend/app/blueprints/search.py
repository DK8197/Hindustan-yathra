from flask import Blueprint, request, jsonify
from app.services.search_service import search_tours

search_bp = Blueprint("search", __name__)

@search_bp.get("")
def search():
    query = request.args.get("q", "").strip()

    if not query:
        return jsonify([])

    return jsonify(search_tours(query))