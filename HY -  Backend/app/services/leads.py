from app import db
from app.models.leads import Lead


def _clean(value, limit):
    return str(value or "").strip()[:limit]


def lead_insertion(data):
    data = data if isinstance(data, dict) else {}

    name = _clean(data.get("name"), 255)
    phone = _clean(data.get("phone"), 20)

    if not name or not phone:
        return {
            "success": False,
            "message": "Name and phone are required",
            "status": 400,
        }

    try:
        lead = Lead(
            name=name,
            email=_clean(data.get("email"), 255),
            phone_number=phone,
            destination=_clean(data.get("destination"), 255),
            message=_clean(data.get("message"), Lead.MESSAGE_MAX_LENGTH),
        )

        db.session.add(lead)
        db.session.commit()

        return {
            "success": True,
            "message": "Lead created successfully",
            "lead_id": lead.id,
            "status": 201,
        }

    except Exception as e:
        db.session.rollback()
        print(f"Lead insertion failed: {e}")

        return {
            "success": False,
            "message": "Failed to create lead",
            "status": 500,
        }