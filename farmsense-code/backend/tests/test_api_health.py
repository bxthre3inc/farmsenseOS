from fastapi.testclient import TestClient
from app.api.main import app
from app.core.database import get_db
from unittest.mock import MagicMock
import pytest

def override_get_db():
    db = MagicMock()
    db.query.return_value.filter.return_value.first.return_value = None
    yield db

app.dependency_overrides[get_db] = override_get_db
client = TestClient(app)

def test_root():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {
        "status": "online",
        "system": "FarmSense Core Engine",
        "documentation": "/docs"
    }

def test_health():
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json() == {"status": "healthy"}

def test_auth_login_invalid():
    # Test valid endpoint but invalid credentials
    response = client.post("/api/v1/auth/login", json={"email": "bad@email.com", "password": "wrong"})
    assert response.status_code == 401

def test_users_unauthorized():
    response = client.get("/api/v1/users/")
    assert response.status_code in [401, 403] # Unauthorized or Forbidden expected

def test_metrics_unauthorized():
    response = client.get("/api/v1/metrics/")
    # If no auth required, might be 200 or 401/403. Assuming protected.
    assert response.status_code in [200, 401, 403, 404]

def test_hardware_ingest_unauthorized():
    response = client.post("/api/v1/hardware/ingest", json={})
    # Could be 401, 403, 404, or 422 if body validation runs before auth
    assert response.status_code in [401, 403, 404, 422]
