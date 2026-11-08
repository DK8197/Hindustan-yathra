import os
from flask import Flask,request,abort
from flask_cors import CORS
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from redis import Redis
from dotenv import load_dotenv
from flask_jwt_extended import JWTManager



class InMemoryStore:
    def __init__(self):
        self._data = {}

    def setex(self, key, ttl, value):
        self._data[key] = value

    def get(self, key):
        return self._data.get(key)

    def delete(self, key):
        self._data.pop(key, None)

    def ping(self):
        return True

load_dotenv()

app = Flask(__name__)
db = SQLAlchemy()
migrate = Migrate()

redis_url = os.getenv("REDIS_URL")
rate_limit_url = os.getenv("RATE_LIMIT_STORAGE_URL") or redis_url

try:
    if redis_url:
        redis_client = Redis.from_url(redis_url, decode_responses=True)
    else:
        redis_client = Redis.from_url("redis://localhost:6379/0", decode_responses=True)
    redis_client.ping()
except Exception:
    redis_client = InMemoryStore()

if rate_limit_url and not os.getenv("TESTING"):
    limiter = Limiter(key_func=get_remote_address, default_limits=["200 per day", "50 per hour"], storage_uri=rate_limit_url)
else:
    limiter = Limiter(key_func=get_remote_address, default_limits=["200 per day", "50 per hour"])


def normalize_database_url(url: str | None) -> str:
    if not url:
        return "sqlite:///hindustanyatra.db"
    url = url.strip()
    if url.startswith("postgres://"):
        return "postgresql+psycopg://" + url[len("postgres://"):]
    if url.startswith("postgresql://"):
        return "postgresql+psycopg://" + url[len("postgresql://"):]
    return url


def create_app(test_config=None):
    app = Flask(__name__)
    is_testing = os.getenv("TESTING", "").lower() in ("true", "1")
    if is_testing:
        raw_db_uri = os.getenv("SQLALCHEMY_DATABASE_URI") or "sqlite:///:memory:"
    else:
        raw_db_uri = os.getenv("DATABASE_URL") or os.getenv("SQLALCHEMY_DATABASE_URI")
    db_uri = normalize_database_url(raw_db_uri)

    app.config.from_mapping(
        TESTING=is_testing,
        SECRET_KEY=os.getenv("SECRET_KEY", "dev-secret"),
        JWT_SECRET_KEY=os.getenv("JWT_SECRET_KEY", "dev-secret"),
        SQLALCHEMY_DATABASE_URI=db_uri,
        SQLALCHEMY_TRACK_MODIFICATIONS=False,
        SQLALCHEMY_ENGINE_OPTIONS={
            "pool_pre_ping": True,
            "pool_recycle": 300,
        },
        REDIS_URL=os.getenv("REDIS_URL", "redis://localhost:6379/0"),
        UPLOAD_FOLDER=os.getenv("UPLOAD_FOLDER", "/tmp/hindustanyathra/uploads"),
        JSON_SORT_KEYS=False,
    )

    if test_config:
        app.config.update(test_config)

    SECRET = os.environ.get('API_SECRET')
    
    @app.before_request
    def verify_app():
        if app.config.get("TESTING"):
            return None
        if request.method == "OPTIONS":
            return "", 204
        if request.path == "/health":
            return None

        if SECRET and request.headers.get("X-App-Key") != SECRET:
            abort(403)

    CORS(app, resources={r"/api/*": {"origins": ['*'], "allow_headers": ["Content-Type", "Authorization", "X-App-Key"]}})

    db.init_app(app)
    migrate.init_app(app, db)
    limiter.init_app(app)

    from app.models.user import User
    from app.models.tour import Tour
    from app.models.leads import Lead
    from app.models.social_media import SocialMediaLink

    with app.app_context():
        try:
            db.create_all()
        except Exception as e:
            app.logger.warning(f"db.create_all() encountered: {e}")
    

    app.config["JWT_TOKEN_LOCATION"] = ["cookies"]
    app.config["JWT_COOKIE_SECURE"] = False
    app.config["JWT_COOKIE_CSRF_PROTECT"] = False
    app.config["JWT_ACCESS_COOKIE_PATH"] = "/"
    app.config["JWT_REFRESH_COOKIE_PATH"] = "/"
    jwt = JWTManager(app)

    from app.blueprints.auth import auth_bp
    from app.blueprints.tours import tours_bp
    from app.blueprints.excel import excel_bp
    from app.blueprints_admin.updateTours import admin_bp
    from app.blueprints.destinations import destinations_bp
    from app.blueprints.testimonials import testimonials_bp
    from app.blueprints.bookings import bookings_bp
    from app.blueprints.search import search_bp
    from app.blueprints.leads import lead_bp
    from app.blueprints.slug_details import details_bp
    from app.blueprints.social_media import social_bp
    from app.blueprints_admin.admin_login import auth_admin_bp

    app.register_blueprint(auth_bp, url_prefix="/api/v1/auth")
    app.register_blueprint(tours_bp, url_prefix="/api/v1/tours")
    app.register_blueprint(excel_bp, url_prefix="/api/v1/excel")
    app.register_blueprint(admin_bp, url_prefix="/api/v1/admin")
    app.register_blueprint(destinations_bp, url_prefix="/api/v1/destinations")
    app.register_blueprint(testimonials_bp, url_prefix="/api/v1/testimonials")
    app.register_blueprint(search_bp,url_prefix="/api/v1/search")
    app.register_blueprint(bookings_bp, url_prefix="/api/v1/bookings")
    app.register_blueprint(lead_bp, url_prefix="/api/v1/leads")
    app.register_blueprint(details_bp, url_prefix="/api/v1/details")
    app.register_blueprint(social_bp, url_prefix="/api/v1/social")
    app.register_blueprint(auth_admin_bp, url_prefix="/api/v1/adminauth")


    @app.get("/health")
    def health():
        import time
        from sqlalchemy import text

        services = {}
        all_healthy = True

        # Check Database Health (Neon PostgreSQL / SQLAlchemy)
        try:
            t0 = time.time()
            db.session.execute(text("SELECT 1"))
            db_latency = round((time.time() - t0) * 1000, 2)
            services["database"] = {"status": "ok", "latency_ms": db_latency}
        except Exception as e:
            all_healthy = False
            services["database"] = {"status": "unhealthy", "error": str(e)}

        # Check Redis Health (Memory Store)
        try:
            t0 = time.time()
            if hasattr(redis_client, "ping") and redis_client.ping():
                redis_latency = round((time.time() - t0) * 1000, 2)
                services["redis"] = {"status": "ok", "latency_ms": redis_latency}
            else:
                all_healthy = False
                services["redis"] = {"status": "unhealthy", "error": "ping returned falsy"}
        except Exception as e:
            all_healthy = False
            services["redis"] = {"status": "unhealthy", "error": str(e)}

        status_code = 200 if all_healthy else 503
        return {
            "status": "ok" if all_healthy else "degraded",
            "services": services,
        }, status_code

    return app
