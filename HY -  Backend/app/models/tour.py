from app import db
from sqlalchemy import JSON
from datetime import datetime


class Tour(db.Model):
    __tablename__ = "tours"
    __table_args__ = {
        "mysql_charset": "utf8mb4",
        "mysql_collate": "utf8mb4_unicode_ci"
    }

    id = db.Column(db.Integer, primary_key=True)

    # Common query fields
    slug = db.Column(db.String(255), unique=True, nullable=False, index=True)

    category = db.Column(
        db.String(100),
        nullable=False,
        index=True
    )

    featured = db.Column(
        db.Boolean,
        nullable=False,
        default=False,
        index=True
    )

    active = db.Column(
        db.Boolean,
        nullable=False,
        default=True,
        index=True
    )

    is_domestic = db.Column(
        db.Boolean,
        nullable=False,
        default=True
    )

    price_from = db.Column(
        db.Integer,
        nullable=True
    )

    region = db.Column(
        db.String(20),
        nullable=True
    )

    currency = db.Column(
        db.String(10),
        nullable=True,
        default="INR"
    )

    duration_days = db.Column(
        db.Integer,
        nullable=True
    )

    duration_nights = db.Column(
        db.Integer,
        nullable=True
    )

    # Entire tour JSON document
    json_data = db.Column(
        JSON,
        nullable=False
    )

    created_at = db.Column(
        db.DateTime,
        default=datetime.utcnow
    )

    updated_at = db.Column(
        db.DateTime,
        default=datetime.utcnow,
        onupdate=datetime.utcnow
    )

    def to_dict(self):
        data = self.json_data or {}
        if isinstance(data, str):
            import json
            try:
                data = json.loads(data)
            except Exception:
                data = {}

        if isinstance(data, dict):
            data = dict(data)
            data.setdefault("id", self.slug or str(self.id))
            data.setdefault("slug", self.slug)
            data.setdefault("category", self.category)
            if self.price_from is not None:
                data.setdefault("priceFrom", self.price_from)
            if self.duration_days is not None:
                data.setdefault("durationDays", self.duration_days)
            if self.duration_nights is not None:
                data.setdefault("durationNights", self.duration_nights)
            data.setdefault("isDomestic", self.is_domestic)
            if not data.get("heroImage"):
                if data.get("hero_image"):
                    data["heroImage"] = data["hero_image"]
                elif isinstance(data.get("seo"), dict) and data["seo"].get("ogImage"):
                    data["heroImage"] = data["seo"]["ogImage"]
                elif isinstance(data.get("gallery"), list) and len(data["gallery"]) > 0:
                    first = data["gallery"][0]
                    data["heroImage"] = first if isinstance(first, str) else (first.get("url") if isinstance(first, dict) else None)

        return data

    @classmethod
    def from_json(cls, data):
        return cls(
            slug=data["slug"],
            category=data["category"],
            featured=data.get("featured", False),
            active=data.get("active", True),
            is_domestic=data.get("isDomestic", True),
            price_from=data.get("priceFrom"),
            currency=data.get("currency"),
            duration_days=data.get("durationDays"),
            duration_nights=data.get("durationNights"),
            json_data=data
        )