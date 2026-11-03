from flask import Blueprint, request, jsonify
from app.services.leads import lead_insertion

lead_bp = Blueprint('leads',__name__)

@lead_bp.route('/insert', methods=['POST'])
def create_lead():
    result = lead_insertion(request.get_json(silent=True))
    status = result.pop("status")

    if not result["success"]:
        return jsonify({
            "success": False,
            "error": result["message"],
            "message": result["message"],
        }), status

    return jsonify({
        "success": True,
        "message": result["message"],
    }), status