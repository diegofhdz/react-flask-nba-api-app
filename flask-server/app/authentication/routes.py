from flask import Blueprint, request, redirect, url_for, flash, jsonify, session
from flask_login import login_user, logout_user, login_required
from forms import LoginForm
from models import User
from werkzeug.security import check_password_hash
from models import db
import traceback

auth = Blueprint('auth', __name__)


@auth.route('/login', methods=['POST'])
def login():
    try:
        if request.method == 'POST':
            user_name = request.json['user_name']
            password = request.json['password']

            logged_user = User.query.filter_by(user_name=user_name).first()
            print(logged_user.user_name)

            if logged_user and check_password_hash(logged_user.password_hash, password):
                login_user(logged_user)
                return jsonify({'message': 'success'})
            else:
                return jsonify({'message': 'failure'})
    except:
        return jsonify({'message': 'failure'}, 409)


@auth.route('/register', methods=['POST'])
def register():
    registered = False
    try:
        if request.method == 'POST':
            email = request.json['email']
            password = request.json['password']
            user_name = request.json['user_name']

            new_user = User(email=email, user_name=user_name, password=password)
            db.session.add(new_user)
            print(f"email: {new_user.email}, user_name: {new_user.user_name}, password_hash: {new_user.password_hash}, token: {new_user.token}, id: {new_user.id}")
            db.session.commit()
            print("success")
            registered=True
    except:
        print("Something went wrong. There may be a user with that email or username already.")
        traceback.print_exc()
        return jsonify({'message': 'Something went wrong. There may be a user with that email or username already.'}, 409)

    if registered:
        new_user2 = User.query.filter_by(user_name=user_name).first()
        login_user(new_user2)

    return jsonify({'message': 'success'})

@auth.route('/logout')
def logout():
    logout_user()
    return jsonify({'message': 'success'})


@auth.route('/user', methods=['GET'])
@login_required
def user():
    return jsonify({'message': f'User {session["user_id"]} is logged in!'})