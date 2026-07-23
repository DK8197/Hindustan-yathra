from app import db
from datetime import datetime


class Lead(db.Model):
    __tablename__ = "leads"
    
    id = db.Column(db.Integer,primary_key=True, nullable=False)
    name = db.Column(db.String(255), nullable=False)
    email= db.Column(db.String(255), nullable=False)
    phone_number = db.Column(db.String(20), nullable=False)
    destination = db.Column(db.String(255), nullable=False)
    message = db.Column(db.String(20), nullable=False)
    created_at = db.Column(db.DateTime,nullable=False,default=datetime.utcnow)
    handled = db.Column(db.Boolean,nullable=False,default=False)
    
    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "email": self.email,
            "phone_number": self.phone_number,
            "destination": self.destination,
            "message": self.message
        }






