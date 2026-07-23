import os
from flask import Blueprint, jsonify, request
from werkzeug.utils import secure_filename

from app import db, limiter, redis_client
from app.models.tour import Tour

excel_bp = Blueprint("excel", __name__)


@excel_bp.post("/upload")
@limiter.limit("10 per minute")
def upload_excel():
    if "file" not in request.files:
        return jsonify({"error": "file is required"}), 400

    uploaded = request.files["file"]
    filename = secure_filename(uploaded.filename)
    upload_dir = os.getenv("UPLOAD_FOLDER", "/tmp/hindustanyathra/uploads")
    os.makedirs(upload_dir, exist_ok=True)
    path = os.path.join(upload_dir, filename)
    uploaded.save(path)

    redis_client.delete("tours:all")
    return jsonify({"message": "file uploaded", "path": path})
