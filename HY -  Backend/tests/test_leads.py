import pytest
from flask import Flask

from app import db
from app.blueprints.leads import lead_bp
from app.models.leads import Lead


@pytest.fixture
def client():
    app = Flask(__name__)
    app.config.update(
        SQLALCHEMY_DATABASE_URI="sqlite:///:memory:",
        SQLALCHEMY_TRACK_MODIFICATIONS=False,
    )
    db.init_app(app)
    app.register_blueprint(lead_bp, url_prefix="/api/v1/leads")

    with app.app_context():
        db.create_all()
        yield app.test_client()
        db.session.remove()
        db.drop_all()


def test_lead_is_saved_with_long_message(client):
    message = "x" * 500
    response = client.post(
        "/api/v1/leads/insert",
        json={
            "name": "Asha Rao",
            "phone": "+91 90600 85635",
            "email": "asha@example.com",
            "destination": "Kedarnath",
            "message": message,
        },
    )

    assert response.status_code == 201
    lead = Lead.query.one()
    assert lead.name == "Asha Rao"
    assert lead.message == message


def test_optional_fields_default_to_empty_strings(client):
    response = client.post(
        "/api/v1/leads/insert",
        json={"name": "Asha Rao", "phone": "9060085635"},
    )

    assert response.status_code == 201
    lead = Lead.query.one()
    assert (lead.email, lead.destination, lead.message) == ("", "", "")


def test_missing_required_fields_are_rejected(client):
    response = client.post("/api/v1/leads/insert", json={"phone": "9060085635"})

    assert response.status_code == 400
    assert response.get_json()["success"] is False
    assert Lead.query.count() == 0


def test_invalid_json_body_is_rejected(client):
    response = client.post(
        "/api/v1/leads/insert", data="not json", content_type="application/json"
    )

    assert response.status_code == 400


def test_database_failure_is_reported(client, monkeypatch):
    def fail():
        raise RuntimeError("db down")

    monkeypatch.setattr(db.session, "commit", fail)
    response = client.post(
        "/api/v1/leads/insert",
        json={"name": "Asha Rao", "phone": "9060085635"},
    )

    assert response.status_code == 500
    assert response.get_json()["success"] is False
