# main.py

from flask import Blueprint
from app import db
from flask import Flask, request, Response
from flask import jsonify

main = Blueprint('main', __name__)

@main.route('/')
def index():
    return 'Index'


@main.route('/profile', methods=['GET', 'POST'])
def profile():

    rData = request.get_json()

    if request.method == 'GET':
        return jsonify({'status' : 'success GET'})
    else:
        return jsonify({'status' : rData})
   