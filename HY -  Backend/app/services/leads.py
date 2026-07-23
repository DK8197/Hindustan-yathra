from app import db
from app.models.leads import Lead


def lead_insertion(data):
    try:
        lead = Lead(
            name=data.get("name"),
            email=data.get("email"),
            phone_number=data.get("phone"),
            destination=data.get("destination"),
            message=data.get("message")
        )

        db.session.add(lead)
        db.session.commit()

        return {
            "success": True,
            "message": "Lead created successfully",
            "lead_id": lead.id
        }

    except Exception as e:
        db.session.rollback()

        return {
            "success": False,
            "message": str(e)
        }