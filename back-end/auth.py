# auth.py
from flask import Blueprint, render_template, redirect, url_for, request
from werkzeug.security import generate_password_hash, check_password_hash

from flask import Flask, Response
from flask_login import UserMixin
from app import db

# let's import User from Db
from models import User
# import Db
from app import db
# for cookie tracking
from flask_login import login_user, logout_user, login_required
from app import login_manager
# for json request
import json
from flask import jsonify
# for flash messages
from flask import flash
# for header authorization
import base64


auth = Blueprint('auth', __name__)

@auth.route('/login')
def login():
    return render_template('login.html')

@auth.route('/login', methods=['POST'])
def login_post():
    name = request.form.get('name')
    password = request.form.get('password')
    # remember = True if request.form.get('remember') else False

    user = User.query.filter_by(name=name).first()

    # check if user actually exists
    # take the user supplied password, hash it, and compare it to the hashed password in database
    if not user or not check_password_hash(user.password, password): 
        flash('Please check your login details and try again.')
        return redirect(url_for('auth.login')) # if user doesn't exist or password is wrong, reload the page

    # if the above check passes, then we know the user has the right credentials
    login_user(user)
    # if the above check passes, then we know the user has the right credentials
    return redirect(url_for('main.profile'))

@auth.route('/logout')
@login_required
def logout():
    logout_user()
    return redirect(url_for('main.index'))