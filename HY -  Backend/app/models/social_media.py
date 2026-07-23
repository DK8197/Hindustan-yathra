from app import db
from datetime import datetime

class SocialMediaLink(db.Model):
    __tablename__ = "social_media_links"

    id = db.Column(db.Integer, primary_key=True)
    platform = db.Column(db.String(50), nullable=False)
    thumbnail = db.Column(db.String(255), nullable=True)
    url = db.Column(db.Text, nullable=False)
    display_order = db.Column(db.Integer, default=1)
    active = db.Column(db.Boolean, default=True)
    created_at = db.Column(db.DateTime)

    def to_dict(self):
        return {
            "id": self.id,
            "platform": self.platform,
            "thumbnail": self.thumbnail,
            "url": self.url,
            "display_order": self.display_order,
            "active": self.active,
            "created_at": (
                self.created_at.isoformat()
                if self.created_at
                else None
            ),
        }