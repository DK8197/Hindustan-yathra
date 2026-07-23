from app import create_app


def test_login_flow():
    app = create_app()
    client = app.test_client()
    response = client.post('/api/v1/auth/login', json={'phone': '9999999999', 'password': 'secret123'})
    assert response.status_code == 200
    payload = response.get_json()
    assert 'access_token' in payload
    assert 'refresh_token' in payload
    assert payload['user']['phone'] == '9999999999'
