import os
import pytest

# Ensure testing uses SQLite in-memory database
os.environ["SQLALCHEMY_DATABASE_URI"] = "sqlite:///:memory:"
os.environ["TESTING"] = "true"
os.environ["API_SECRET"] = "test-secret"

from app import create_app, db

@pytest.fixture(autouse=True)
def setup_test_db():
    app = create_app({"TESTING": True, "SQLALCHEMY_DATABASE_URI": "sqlite:///:memory:"})
    with app.app_context():
        db.create_all()
        yield
        db.session.remove()
        db.drop_all()
