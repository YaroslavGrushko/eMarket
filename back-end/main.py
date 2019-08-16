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
def profile1():
    return render_template('profile.html')


from app import app
from app import create_connection

@main.route('/read_categories')
@login_required
def read_category():
    # rData = request.data
    #rData = request.get_json()

    conn = create_connection("eMarket.db")
    cursor = conn.cursor()
    cursor.execute("select * from Categories") # This line performs query and returns json result
    rows = cursor.fetchall()

    if request.method == 'GET':
        # return jsonify(cursor.fetchall())
        return {'category_id' : [row[0] for row in rows], # column1
                'category_name' : [row[1] for row in rows], # column2
                'category_code' : [row[2] for row in rows]} # column3

    else:
        return jsonify({'status' : 'success POST'})