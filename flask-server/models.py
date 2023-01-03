from flask_login import LoginManager, UserMixin
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from datetime import datetime
from werkzeug.security import generate_password_hash
import secrets
import uuid


# login_manager = LoginManager()
ma = Marshmallow()
db = SQLAlchemy()

# @login_manager.user_loader
def load_user(user_id):
    return User.query.get(user_id)


class User(db.Model, UserMixin):
    __tablename__ = 'users'
    id = db.Column(db.String(100), primary_key=True)
    user_name = db.Column(db.String(64), unique=True, default='')
    email = db.Column(db.String(350), unique=True)
    password_hash = db.Column(db.String(128))
    date_created = db.Column(db.DateTime, default=datetime.utcnow)
    token = db.Column(db.String(100), unique=True, default ='')

    def __init__(self, user_name, email, password, token=''):
        self.id = self.set_id()
        self.user_name = user_name
        self.email = email
        self.password_hash = self.set_password_hash(password)
        self.token = self.set_token(24)

    def set_password_hash(self, password):
        return generate_password_hash(password)

    def set_token(self, length):
        return secrets.token_hex(length)

    def set_id(self):
        return str(uuid.uuid4())

    def __repr__(self):
        return '<User {}>'.format(self.username)

