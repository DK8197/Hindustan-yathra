from flask import Blueprint, request, jsonify
from app.services.leads import lead_insertion
import json

lead_bp = Blueprint('leads',__name__)

@lead_bp.route('/insert', methods=['POST'])
def create_lead():
    data = request.get_json()
    print(data.keys())
    try:
        lead_insertion(data)
    except Exception as e:
        print(f"Error occurred: {e}")
        return jsonify({
            "success": False,
            "message": "Failed to create lead"
        }), 400

    return jsonify({
        "success": True,
        "message": "Lead created successfully"
    }), 201