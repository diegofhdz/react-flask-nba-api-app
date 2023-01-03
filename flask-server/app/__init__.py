from flask import Flask, session
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS
from flask_login import LoginManager
from models import db
from config import Config
from .authentication.routes import auth
from flask_session import Session


app = Flask(__name__)
app.config.from_object(Config)
CORS(app, supports_credentials=True)

Session(app)


app.register_blueprint(auth)
# login_manager.init_app(app)
db.init_app(app)
with app.app_context():
    db.create_all()
