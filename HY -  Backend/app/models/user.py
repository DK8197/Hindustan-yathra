from app.models.base import BaseModel
from app import db


class User(BaseModel):
    __tablename__ = "users"

    phone = db.Column(db.String(20), unique=True, nullable=False)
    name = db.Column(db.String(120), nullable=True)
    password_hash = db.Column(db.String(255), nullable=True)
    otp_secret = db.Column(db.String(32), nullable=True)
    is_active = db.Column(db.Boolean(), default=True)
    role = db.Column(db.String(50), default="customer")

    def to_dict(self):
        return {
            "id": self.id,
            "phone": self.phone,
            "name": self.name,
            "role": self.role,
            "is_active": self.is_active,
        }
