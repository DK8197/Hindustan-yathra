from flask import Blueprint, jsonify,request
from app import db
from app.models.tour import Tour
from app.models.leads import Lead
from app.services.excelparse import import_tour_excel
from datetime import datetime, timedelta
import json
from sqlalchemy.orm.attributes import flag_modified
from copy import deepcopy
from app.services.tour_admin_service import get_tours_admin
from app import limiter

admin_bp = Blueprint("admin", __name__)

@admin_bp.patch("/tours/update/status")
def update_status():

    data = request.json

    tour = Tour.query.get_or_404(data["tourId"])

    tour.active = data["active"]

    db.session.commit()

    return jsonify({
        "success": True
    })


@admin_bp.get("/tours")
@limiter.limit("50 per minute")
def list_tours():

    page = request.args.get(
        "page",
        1,
        type=int
    )

    limit = request.args.get(
        "limit",
        12,
        type=int
    )

    category = request.args.get(
        "category"
    )

    domestic = request.args.get(
        "domestic"
    )

    featured = request.args.get(
        "featured"
    )

    sort = request.args.get(
        "sort"
    )

    return jsonify(
        get_tours_admin(
            page=page,
            limit=limit,
            category=category,
            domestic=domestic,
            featured=featured,
            sort=sort,
        )
    )




@admin_bp.post("/upload-excel")
def upload_tour():

    if "file" not in request.files:
        return {
            "error": "No file uploaded"
        }, 400

    result = import_tour_excel(
        request.files["file"],request.form.get("slug")
    )
    if result['action'] == 'not created':
        return {
            "ok": False,
            "error": "Slug in the Excel file does not match the provided slug."
        }, 504
    
    return {
        "ok": True,
        **result
    }

@admin_bp.get("/tours/<slug>")
def get_tour(slug):
    tour = Tour.query.filter_by(slug=slug).first_or_404()

    return jsonify({
        "id": tour.id,
        "slug": tour.slug,
        "json_data": tour.json_data
    })



@admin_bp.get("/leads")
def get_leads():

    three_months_ago = (
        datetime.utcnow() - timedelta(days=90)
    )

    leads = (
        Lead.query
        .filter(
            Lead.created_at >= three_months_ago
        )
        .order_by(
            Lead.created_at.desc()
        )
        .all()
    )

    return jsonify([
        {
            "id": lead.id,
            "name": lead.name,
            "email": lead.email,
            "phone_number": lead.phone_number,
            "destination": lead.destination,
            "message": lead.message,
            "handled": lead.handled,
            "created_at": lead.created_at.isoformat()
        }
        for lead in leads
    ])

@admin_bp.patch("/leads/<int:lead_id>/handled")
def update_handled_status(lead_id):

    lead = Lead.query.get_or_404(lead_id)

    data = request.get_json()

    lead.handled = bool(
        data.get("handled")
    )

    db.session.commit()

    return jsonify({
        "success": True,
        "handled": lead.handled
    })

@admin_bp.route(
    "/tours/<string:slug>/media",
    methods=["PATCH"]
)
def update_tour_media(slug):

    data = request.get_json() or {}

    json_path = data.get("path")
    new_value = data.get("value")

    if not json_path:
        return jsonify({
            "error": "path is required"
        }), 400

    if not new_value:
        return jsonify({
            "error": "value is required"
        }), 400

    tour = Tour.query.filter_by(
        slug=slug
    ).first()

    if not tour:
        return jsonify({
            "error": "Tour not found"
        }), 404

    json_data = deepcopy(
        tour.json_data
    )

    print("PATH:", json_path)
    print("NEW VALUE:", new_value)

    try:
        keys = json_path.split(".")

        current = json_data

        for key in keys[:-1]:
            if key.isdigit():
                current = current[int(key)]
            else:
                current = current[key]

        last_key = keys[-1]

        # Handle paths like:
        # gallery.0.url
        # heroImage
        if not (
            isinstance(current, str)
            and last_key.isdigit()
        ):

            if last_key.isdigit():
                current[int(last_key)] = new_value
            else:
                current[last_key] = new_value

        # Handle paths like:
        # gallery.0.url.0
        # gallery.0.url.1
        else:
            urls = [
                x.strip()
                for x in current.split(",")
            ]

            index = int(last_key)

            if index >= len(urls):
                return jsonify({
                    "error": f"Invalid image index {index}"
                }), 400

            urls[index] = new_value

            updated_value = ",".join(urls)

            parent = json_data

            for key in keys[:-2]:
                if key.isdigit():
                    parent = parent[int(key)]
                else:
                    parent = parent[key]

            parent[keys[-2]] = updated_value

        tour.json_data = deepcopy(
            json_data
        )

        flag_modified(
            tour,
            "json_data"
        )

        print(
            "Dirty before commit:",
            db.session.is_modified(
                tour,
                include_collections=True
            )
        )

        db.session.commit()

        db.session.refresh(tour)

        print("SUCCESSFULLY SAVED")

        return jsonify({
            "success": True,
            "path": json_path,
            "value": new_value
        })

    except Exception as e:
        db.session.rollback()

        print("MEDIA UPDATE ERROR:", str(e))

        return jsonify({
            "error": str(e)
        }), 500

