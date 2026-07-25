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

load_dotenv()

app = Flask(__name__)
db = SQLAlchemy()
migrate = Migrate()
limiter = Limiter(key_func=get_remote_address, default_limits=["200 per day", "50 per hour"])
redis_client = Redis.from_url(os.getenv("REDIS_URL", "redis://localhost:6379/0"), decode_responses=True)
try:
    redis_client.ping()
except Exception:
    redis_client = InMemoryStore()


def create_app():
    app = Flask(__name__)
    app.config.from_mapping(
        SECRET_KEY=os.getenv("SECRET_KEY", "dev-secret"),
        JWT_SECRET_KEY=os.getenv("JWT_SECRET_KEY", "dev-secret"),
        SQLALCHEMY_DATABASE_URI=os.getenv("SQLALCHEMY_DATABASE_URI", "mysql+pymysql://root:root@localhost:3306/hindustanyatra"),
        SQLALCHEMY_TRACK_MODIFICATIONS=False,
        REDIS_URL=os.getenv("REDIS_URL", "redis://localhost:6379/0"),
        UPLOAD_FOLDER=os.getenv("UPLOAD_FOLDER", "/tmp/hindustanyathra/uploads"),
        JSON_SORT_KEYS=False,
    )

    SECRET=os.environ.get('API_SECRET')
    
    @app.before_request
    def verify_app():
        print(
        request.method,
        request.path,
        request.headers.get("X-App-Key")
        )

        if request.method == "OPTIONS":
            return "",204


        if request.headers.get("X-App-Key") != SECRET:
            abort(403)

    CORS(app,resources={r"/api/*": {"origins": ['*'],"allow_headers": ["Content-Type","Authorization","X-App-Key",],}},)

    # CORS(app, resources={r"/api/*": {"origins": "*"}})
    # CORS(app,resources={r"/api/*": {"origins": ["https://hindustanyatra.com","https://www.hindustanyatra.com","https://hindustan-yathra.vercel.app","http://localhost:3000",],"allow_headers": ["Content-Type","Authorization","X-App-Key",],}},)
    db.init_app(app)
    migrate.init_app(app, db)
    limiter.init_app(app)

    from app.models.user import User
    from app.models.tour import Tour
    from app.models.leads import Lead
    from app.models.social_media import SocialMediaLink

    with app.app_context():
        db.create_all()
    

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
        return {"status": "ok"}

    return app
