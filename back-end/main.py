# main.py

from flask import Blueprint, render_template
from app import db
from flask import Flask, request, Response
from flask import jsonify
# for cookie tracking
from flask_login import login_user, logout_user, login_required

from flask import Blueprint
from app import db

main = Blueprint('main', __name__)

@main.route('/')
def index():
    return render_template('index.html')

@main.route('/profile')
@login_required
def profile():
    return render_template('profile.html')