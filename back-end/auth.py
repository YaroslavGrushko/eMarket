# auth.py
from flask import Blueprint, render_template, redirect, url_for, request
from werkzeug.security import generate_password_hash, check_password_hash
# for smart protect of the important pages/routes
from flask_login import login_user, logout_user, login_required


from flask import Blueprint
from app import db
# for cookie tracking
from flask_login import login_user
# let's import User from Db
from models import User
# for json request
import json
from flask import jsonify

auth = Blueprint('auth', __name__)

@auth.route('/login', methods=['POST'])
def login_post():
    jsonData= request.get_json()
    # data =  json.loads(jsonData)

    # name = request.form.get('Admin_Name')
    # password = request.form.get('Admin_Password')
    # remember = True if request.form.get('remember') else False


    name = jsonData['Admin_Name']
    password = jsonData['Admin_Password']

    user = User.query.filter_by(name=name).first()

    # check if user actually exists
    # take the user supplied password, hash it, and compare it to the hashed password in database
    if not user or not check_password_hash(user.password, password): 
        return jsonify({'loginStatus' : False}) # if user doesn't exist or password is wrong, reload the page
    
    # if the above check passes, then we know the user has the right credentials
    login_user(user)
    # if the above check passes, then we know the user has the right credentials
    return jsonify({'loginStatus' : True})

# @auth.route('/signup')
# def signup():
#     return 'Signup'

@auth.route('/logout')
@login_required
def logout():
    logout_user()
    return 'Logout'