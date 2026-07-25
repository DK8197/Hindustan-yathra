from flask import Blueprint, jsonify, request
from app.models.social_media import SocialMediaLink
from app import db

social_bp = Blueprint("social",__name__)

@social_bp.get("/links")
def get_social_links():

    records = (
        SocialMediaLink.query
        .filter_by(active=True)
        .order_by(
            SocialMediaLink.platform,
            SocialMediaLink.display_order
        )
        .all()
    )

    youtube = []
    instagram = []

    for r in records:
        item = {
            "id": r.id,
            "platform": r.platform,
            "url": r.url,
            "thumbnail": r.thumbnail,
            "display_order": r.display_order
        }

        if r.platform == "youtube":
            youtube.append(item)
        elif r.platform == "instagram":
            instagram.append(item)

    return jsonify({
        "youtube": youtube,
        "instagram": instagram
    })

# Get all links
@social_bp.get("/admin/")
def get_links():
    links = (
        SocialMediaLink.query
        .order_by(
            SocialMediaLink.platform,
            SocialMediaLink.display_order
        )
        .all()
    )

    return jsonify([link.to_dict() for link in links])


# Add link
@social_bp.post("/admin/")
def add_link():
    data = request.get_json()

    link = SocialMediaLink(
        platform=data["platform"],
        thumbnail=data["thumbnail"],
        url=data["url"],
        display_order=data.get("display_order", 1),
        active=True,
    )

    db.session.add(link)
    db.session.commit()

    return jsonify(link.to_dict()), 201


# Delete link
@social_bp.delete("/admin/<int:link_id>")
def delete_link(link_id):
    link = SocialMediaLink.query.get_or_404(link_id)

    db.session.delete(link)
    db.session.commit()

    return jsonify({"message": "Deleted"})

@social_bp.put("/admin/<int:link_id>")
def update_link(link_id):
    link = SocialMediaLink.query.get_or_404(link_id)

    data = request.get_json()

    if "active" in data:
        link.active = data["active"]

    if "display_order" in data:
        link.display_order = data["display_order"]

    if "thumbnail" in data:
        link.thumbnail = data["thumbnail"]

    if "url" in data:
        link.url = data["url"]

    if "platform" in data:
        link.platform = data["platform"]

    db.session.commit()

    return jsonify(link.to_dict())
