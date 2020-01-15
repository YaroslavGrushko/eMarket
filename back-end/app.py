

from flask import Flask, request, Response, abort

from flask_restful import Resource, Api

from flask import Flask, request, jsonify, make_response
from flask_sqlalchemy import SQLAlchemy
import uuid
from werkzeug.security import generate_password_hash, check_password_hash
import jwt
from flask_cors import CORS, cross_origin

from datetime import datetime
from datetime import timedelta

from functools import wraps

import json
# for has been blocked by CORS policy: Cross origin requests are only error
from flask_cors import CORS, cross_origin
import sqlite3
from sqlite3 import Error
from datetime import datetime
from flask import jsonify

# for user authentification in SQLite Db
from flask_sqlalchemy import SQLAlchemy
# for creating admin user >>>>>>>>>>>>>>>
from flask import Blueprint, render_template, redirect, url_for
from werkzeug.security import generate_password_hash, check_password_hash
# for creating admin user <<<<<<<<<<<<<<<

# for cookie tracking
from flask_login import LoginManager
from flask_login import login_required, current_user




# prediction
import pandas as pd
import matplotlib as mpl
import matplotlib.pyplot as plt
import matplotlib.ticker as mticker
from sklearn.linear_model import LinearRegression
from sklearn.metrics import r2_score
from dateutil.relativedelta import *
import numpy as np

# init SQLAlchemy so we can use it later in our models
db = SQLAlchemy()

app = Flask(__name__)
CORS(app)

# for user authentification in SQLite Db >>>>>>>>>>>
app.config['SECRET_KEY'] = '9OLWxND4o83j4K4iuopO'
# app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///db.sqlite'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///mytodo.db'
# for user authentification in SQLite Db <<<<<<<<<<<<

# let's inicizlize db
db.init_app(app)


def create_connection(db_file):
    try:
        conn = sqlite3.connect(db_file)
        return conn
    except Error as e:
        print(e)
 
    return None

api = Api(app)


# # creating default tables with it content>>>>>>>>>>>>>>>>>>>>>>>
# # >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
# conn = create_connection("eMarket.db") # или :memory: чтобы сохранить в RAM
# cursor = conn.cursor()
# # # drop table
# # DROPsql = "DROP TABLE Categories"
# # cursor.execute(DROPsql)

# cursor.execute("""CREATE TABLE IF NOT EXISTS "Categories" 
# (
# "category_id" VARCHAR,
# "category_name" VARCHAR,
# "category_code" VARCHAR,
# "time" DATETIME
# )
#             """)
# # create the initial category table
# new_category = [('Зошити', 'Блокноти, зошити, альбоми', 'fa fa-book', datetime.now()),
#                 ('Калькулятори', 'Калькулятори, диктофони', 'fa fa-calculator', datetime.now()),
#                 ('Папір', 'Папір та копіювальне приладдя', 'fa fa-clone', datetime.now()),
#                 ('Карандаші', 'Олівці, ручки, стрижні', 'fa fa-edit', datetime.now()),
#                 ('Дрібниці', 'Канцелярські дрібниці', 'fa fa-eraser', datetime.now()),
#                 ('ДляШколи', 'Навчальне приладдя', 'fa fa-graduation-cap', datetime.now()),
#                 ]
# cursor.executemany("INSERT INTO Categories VALUES (?,?,?,?)", new_category)
# conn.commit()
# # <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
# # <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

# # creating default table Products>>>>>>>>>>>>>>>>>>>>>>>
# conn = create_connection("eMarket.db") # или :memory: чтобы сохранить в RAM
# cursor = conn.cursor()
# cursor.execute("""CREATE TABLE IF NOT EXISTS "Products" 
# (
# "category_id" VARCHAR,
# "name" VARCHAR,
# "src" VARCHAR,
# "in_price" VARCHAR,
# "out_price" VARCHAR,
# "about" VARCHAR
# )
#             """)

# new_products = [
# ('Зошити', 'Зошит 1', 'images/copybooks/cb1.png', '20',  '30', 'Елегантний зошит у лінійку (48 аркушів) з якісного біосумісного паперу, виготовленого за сучасними еко-технологіями. Висока адгезійна здатність пареру для усіх видів пишучих приладів (олівці, ручки, фламастери). Висока стійкість до фламастерів та стирачок.'),
# ('Зошити', 'Зошит 2', 'images/copybooks/cb2.png', '25',  '30', 'Елегантний зошит у лінійку (96 аркушів) з якісного біосумісного паперу, виготовленого за сучасними еко-технологіями. Висока адгезійна здатність пареру для усіх видів пишучих приладів (олівці, ручки, фламастери). Висока стійкість до фламастерів та стирачок.'),
# ('Зошити', 'Зошит 3', 'images/copybooks/cb3.png', '30',  '30', 'Практичний та приємний на дотик зошит у клітинку (48 аркушів) з якісного біосумісного паперу, виготовленого за сучасними еко-технологіями. Висока адгезійна здатність пареру для усіх видів пишучих приладів (олівці, ручки, фламастери). Висока стійкість до фламастерів та стирачок.'),
# ('Зошити', 'Зошит 4', 'images/copybooks/cb4.png', '20',  '30', 'Практичний та приємний на дотик зошит у клітинку (48 аркушів) з якісного біосумісного паперу, виготовленого за сучасними еко-технологіями. Висока адгезійна здатність пареру для усіх видів пишучих приладів (олівці, ручки, фламастери). Висока стійкість до фламастерів та стирачок.'),               
# ('Калькулятори', 'Калькулятор 1', 'images/calculators/calc1.png', '20', '30', 'Сучасний ергономічний калькулятор з функцією голосового набору'),
# ('Калькулятори', 'Калькулятор 2', 'images/calculators/calc2.png', '250', '300', 'Сучасний ергономічний калькулятор з функцією голосового набору та сонячними елементами живлення.'),
# ('Калькулятори', 'Калькулятор 3', 'images/calculators/calc3.png', '200', '300', 'Сучасний ергономічний калькулятор з функцією голосового набору та сонячними елементами живлення.'),
# ('Калькулятори', 'Калькулятор 4', 'images/calculators/calc4.png', '200', '300', 'Практичний та зручний калькулятор з функцією з сонячними елементами живлення.'),                              
# ('Папір', 'Папір 1', 'images/paper/paper1.png', '50', '1000', 'Високоякісний папір для лазерних принтерів.'),
# ('Папір', 'Папір 2', 'images/paper/paper2.png', '50', '100', 'Приємний на дотик високоякісний папір для струйних принтерів.'),
# ('Папір', 'Папір 3', 'images/paper/paper3.png', '50', '100', 'Високоякісний папір для лазерних та струйних принтерів.'),                              
# ('Карандаші', 'Карандаші 1', 'images/pencils/penc1.png', '20', '30', 'Твердогрифельні прості карандаші для креслення.'),
# ('Карандаші', 'Карандаші 2', 'images/pencils/penc2.png', '20', '30', 'Високоякісні карандаші з різноманітною твердістю гифеля для графіки та креслення.'),
# ('Карандаші', 'Карандаші 3', 'images/pencils/penc3.png', '20', '30', 'Кольорові олівці для малювання з біосумісного грифелю.'), 
# ('Карандаші', 'Ручки 1', 'images/pencils/penc4.png', '20', '30', 'Високоякісні автоматичні кулькові ручки.'),
# ('Карандаші', 'Ручки 2', 'images/pencils/penc5.png', '15', '30', 'Стильні ергономічні ручки для ділових людей.'),
# ('Карандаші', 'Ручки 3', 'images/pencils/penc6.png', '20', '30', 'Високоякісні автоматичні кулькові ручки з підвищеною адгезією чернил до бумаги.'),
# ('Карандаші', 'Стержень 1', 'images/pencils/penc7.png', '20', '30', 'Високоякісні стрижні з стійкими чорнилами.'),
# ('Карандаші', 'Стержень 2', 'images/pencils/penc8.png', '20', '30', 'Високоякісні стрижні з стійкими чорнилами та підвищеною адгезією до бумаги.'),                            
# ('Дрібниці', 'Дрібниці 1', 'images/nothingness/noth1.png', '20', '30', 'Біосумісні коректори та канцелярські клеї з високою склеючою здатністю.'),
# ('Дрібниці', 'Дрібниці 2', 'images/nothingness/noth2.png', '20', '30', 'Приємні на вигляд та пружні скріпки для пареру та файлів.'),
# ('Дрібниці', 'Дрібниці 3', 'images/nothingness/noth3.png', '20', '30', 'Комбіновані гнучки та практичні лінійки'),
# ('Дрібниці', 'Дрібниці 4', 'images/nothingness/noth4.png', '20', '30', 'Скоби для степлерів з високоякісної сталі'),
# ('Дрібниці', 'Дрібниці 5', 'images/nothingness/noth5.png', '20', '30', 'Стильні бейджеки зі зручним кріпленням'),                
# ('ДляШколи', 'ДляШколи 1', 'images/school/sch1.png', '200', '300', 'Біосумісні ортопедичні стильні дівочі ранці.'),
# ('ДляШколи', 'ДляШколи 2', 'images/school/sch2.png', '200', '300', 'Біосумісні отропедичні чоловічі ранці підвищеної міцності.'),
# ('ДляШколи', 'ДляШколи 3', 'images/school/sch3.png', '200', '300', 'Спортивні ергономічні сумки з біосумісних матеріалів.'),
# ('ДляШколи', 'ДляШколи 4', 'images/school/sch4.png', '20', '30', 'Обкладенки для книжок та зошитів з екологічного поліетилену'),
# ('ДляШколи', 'ДляШколи 5', 'images/school/sch5.png', '20', '30', 'Обкладенки для паперів з екологічного поліетилену'),                
#                 ]
# cursor.executemany("INSERT INTO Products VALUES (?,?,?,?,?,?)", new_products)
# conn.commit()
# # <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
# # <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<


# flask API-authorization >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

app.config['SECRET_KEY'] = 'thisissecret'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///mytodo.db'

db = SQLAlchemy(app)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    public_id = db.Column(db.String(50), unique=True)
    name = db.Column(db.String(50))
    password = db.Column(db.String(80))
    admin = db.Column(db.Boolean)

class Todo(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    text = db.Column(db.String(50))
    complete = db.Column(db.Boolean)
    user_id = db.Column(db.Integer)

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        test_role = ''

        if 'x-access-token' in request.headers:
            token = request.headers['x-access-token']

        if not token:
            return jsonify({'message' : 'Token is missing!'}), 401

        try: 
            data = jwt.decode(token, app.config['SECRET_KEY'])
            current_user = User.query.filter_by(public_id=data['public_id']).first()
            username = current_user.name
        except:
            return jsonify({'message' : 'Token is invalid!'}), 401

        return f(username, *args, **kwargs)

    return decorated

@app.route('/login', methods=['GET', 'POST'])
def login():
    auth = request.authorization

    if not auth or not auth.username or not auth.password:
        return make_response('Could not verify', 401, {'WWW-Authenticate' : 'Basic realm="Login required!"'})

    user = User.query.filter_by(name=auth.username).first()

    if not user:
        return make_response('Could not verify', 401, {'WWW-Authenticate' : 'Basic realm="Login required!"'})

    if check_password_hash(user.password, auth.password):
        token = jwt.encode({'public_id' : user.public_id, 'exp' : datetime.utcnow() + timedelta(minutes=30)}, app.config['SECRET_KEY'])

        return jsonify({'token' : token.decode('UTF-8')})

    return make_response('Could not verify', 401, {'WWW-Authenticate' : 'Basic realm="Login required!"'})

# <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

# sign-up user
@app.route('/signin', methods=['GET', 'POST'])
def signin_a_user():
    auth = request.authorization

    if not auth or not auth.username or not auth.password:
        return make_response('Could not verify', 401, {'WWW-Authenticate' : 'Basic realm="Login required!"'})

    # let's inicizlize db
    # db.init_app(app)
    # let's create db
    with app.app_context():
        # db.create_all()
        ## admin 
        # name = 'admin'
        # password = 'admin'
        # sales_manager (sm)
        name = auth.username
        password = auth.password
        user = User.query.filter_by(name=name).first() # if this returns a user, then the email already exists in database

        if user: # if a user is found, we want to redirect back to signup page so user can try again
            # return redirect(url_for('auth.signup'))
            return 'it is ALREADY exists '+str(name)
        # create new user with the form data. Hash the password so plaintext version isn't saved.
        new_user = User(public_id=str(uuid.uuid4()), name=name, password=generate_password_hash(password, method='sha256'), admin=True)

        # add the new user to the database
        db.session.add(new_user)
        db.session.commit()
        return "success"
#DB-routes>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

@app.route('/read_categories', methods=['GET', 'POST'])
def read_category():
    # rData = request.data
    #rData = request.get_json()

    conn = create_connection("eMarket.db")
    cursor = conn.cursor()
    
    cursor.execute("""CREATE TABLE IF NOT EXISTS "Categories" 
            (
            "category_id" VARCHAR,
            "category_name" VARCHAR,
            "category_code" VARCHAR,
            "name" VARCHAR,
            "photo" VARCHAR,
            "time" DATETIME
            )
            """)
    
    cursor.execute("select * from Categories") # This line performs query and returns json result
    rows = cursor.fetchall()

    if request.method == 'GET':
        # return jsonify(cursor.fetchall())
        return {'category_id' : [row[0] for row in rows], # column1
                'category_name' : [row[1] for row in rows], # column2
                'category_code' : [row[2] for row in rows], # column3
                'name' : [row[3] for row in rows], # column4
                'photo' : [row[4] for row in rows], # column5
                } 

    else:
        return jsonify({'status' : 'success POST'})

@app.route('/read_category', methods=['GET', 'POST'])
@token_required
def read(username):
    if username=='admin':
        # rData = request.data
        rData = request.get_json()

        conn = create_connection("eMarket.db")
        cursor = conn.cursor()
        cursor.execute("SELECT * from Categories WHERE category_id ="+"'"+str(rData)+"'")
        
        rows = cursor.fetchall()

        if request.method == 'POST':
            # return jsonify(cursor.fetchall())
            return {'category_id' : [row[0] for row in rows], # column1
                    'category_name' : [row[1] for row in rows], # column2
                    'category_code' : [row[2] for row in rows], # column3
                    'name' : [row[3] for row in rows], # column4
                    'photo' : [row[4] for row in rows]} # column5
        else:
            return jsonify({'status' : 'success GET'})
    else:
        abort(403)

@app.route('/add_categories', methods=['GET', 'POST'])
@token_required
def save_category(username):
    if username == 'admin':
        # rData = request.data
        rData = request.get_json()

        conn = create_connection("eMarket.db")
        cursor = conn.cursor()

        cursor.execute("""CREATE TABLE IF NOT EXISTS "Categories" 
                (
                "category_id" VARCHAR,
                "category_name" VARCHAR,
                "category_code" VARCHAR,
                "name" VARCHAR,
                "photo" VARCHAR,
                "time" DATETIME
                )
                """)
        
        new_category = [( rData['category_id'], rData['category_name'], rData['category_code'], rData['manager_name'], rData['manager_photo'], datetime.now()),]
        cursor.executemany("INSERT INTO Categories VALUES (?,?,?,?,?,?)", new_category)
        conn.commit()

        if request.method == 'GET':
            return jsonify({'status' : 'success GET'})
        else:
            return jsonify({'status' : 'adding successfully'})
    else:
        abort(403)

@app.route('/edit_categories', methods=['GET', 'POST'])
@token_required
def edit_categories(username):
    if username == 'admin':
        # rData = request.data
        rData = request.get_json()

        conn = create_connection("eMarket.db")
        cursor = conn.cursor()

        sql = ''' UPDATE "Categories"
                SET category_id = ? ,
                    category_name = ? ,
                    category_code = ?,
                    name = ?,
                    photo = ?
                WHERE category_id = ?'''
        
        task = (rData['category_id'], rData['category_name'], rData['category_code'], rData['name'], rData['photo'], rData['category_id'])
        cursor.execute(sql, task)
        conn.commit()

        if request.method == 'GET':
            return jsonify({'status' : 'success GET'})
        else:
            return jsonify({'category_id' : rData['category_id']})
    else:
        abort(403)

@app.route('/delete_category', methods=['GET', 'POST'])
@token_required
def delete_category(username):
    if (username == 'admin'):
        rData = request.get_json()
        # data = json.loads(rData)
        conn = create_connection("eMarket.db")
        cursor = conn.cursor()
        cursor.execute("DELETE FROM Categories WHERE category_id ="+"'"+str(rData)+"'")
        cursor.execute("DROP TABLE"+"'"+str(rData)+"'")
        conn.commit()
        return 'Ok'
    else:
        abort(403)

@app.route('/read_product', methods=['GET', 'POST'])
def read_products():
    # rData = request.data
    rData = request.get_json()

    conn = create_connection("eMarket.db")
    cursor = conn.cursor()
    # before reading check if the table exists:
    # cursor.execute("SELECT count(*) FROM sqlite_master WHERE type='table' AND name='"+rData+"'")
    cursor.execute("SELECT count(*) FROM sqlite_master WHERE type='table' AND name='Products'")
    # to get a tuple with one element, the value of COUNT(*):
    result_of_query=cursor.fetchone()
    # to find the value of count(*) (0 if table no exist and 1 if  table exist):
    value_of_count=result_of_query[0]
    if value_of_count==0:
        return jsonify({'name_of_not_exist_table' : 'Products'})
    else: 
        cursor.execute("select * from Products WHERE category_id ="+"'"+str(rData)+"'") # This line performs query and returns json result
        rows = cursor.fetchall()
        return jsonify(rows) 

@app.route('/add_product', methods=['GET', 'POST'])
@token_required
def add_product(username):
    if(username == 'admin'):
        # rData = request.data
        rData = request.get_json()

        conn = create_connection("eMarket.db")
        cursor = conn.cursor()
        
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS Products(
            name_of_category VARCHAR
            name VARCHAR,
            src VARCHAR,
            in_price VARCHAR,
            out_price VARCHAR,
            about VARCHAR)
            """)

        new_product = [(rData['Current_Category'], rData['Product_Name'], rData['Product_Photo'], rData['Product_In_Price'], rData['Product_Out_Price'], rData['Product_About'])]
        cursor.executemany("INSERT INTO " + rData['Current_Category'] +" VALUES (?,?,?,?,?,?)", new_product)
        conn.commit()

        if request.method == 'GET':
            return jsonify({'status' : 'success GET'})
        else:
            return jsonify({'status' : rData['Current_Category']})
    else:
        abort(403)

@app.route('/update_product', methods=['GET', 'POST'])
@token_required
def update_product(username):
    if(username=='admin'):
        rData = request.get_json()
        conn = create_connection("eMarket.db")
        cursor = conn.cursor()
        
        sql = ''' UPDATE Products
                SET src = ? ,
                    in_price = ? ,
                    out_price = ?,
                    about = ?
                WHERE name = ?'''
        
        task = (rData['Product_Photo'], rData['Product_In_Price'], rData['Product_Out_Price'], rData['Product_About'], rData['Product_Name'])
        cursor.execute(sql, task)
        conn.commit()

        if request.method == 'GET':
            return jsonify({'status' : 'success GET'})
        else:
            return jsonify({'status' : rData['Current_Category']})
    else:
        abort(403)

@app.route('/delete_product', methods=['GET', 'POST'])
@token_required
def delete_product(username):
    if(username=='admin'):
        rData = request.get_json()
        conn = create_connection("eMarket.db")
        cursor = conn.cursor()
        
        sql = ''' DELETE FROM Products
                WHERE name = \"''' + rData['Product_Name'] +'''\"  '''
        
        cursor.execute(sql)
        conn.commit()

        if request.method == 'GET':
            return jsonify({'status' : 'success GET'})
        else:
            return jsonify({'status' : rData['Current_Category']})
    else:
        abort(403)

@app.route('/user', methods=['GET'])
@token_required
# def get_all_users(current_user):
def get_all_users(username):   
    if username=='admin':
        # if not current_user.admin:
        #     return jsonify({'message' : 'Cannot perform that function!'})

        users = User.query.all()

        output = []

        for user in users:
            user_data = {}
            user_data['public_id'] = user.public_id
            user_data['name'] = user.name
            user_data['password'] = user.password
            user_data['admin'] = user.admin
            output.append(user_data)

        return jsonify({'users' : output})
    else:
        abort(403)

@app.route('/add_сheckout_customer', methods=['GET', 'POST'])
# @token_required
def add_сheckout_customer():
    # rData = request.data
    rData = request.get_json()

    conn = create_connection("eMarket.db")
    cursor = conn.cursor()
    
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS Customers(
        name VARCHAR,
        phone VARCHAR,
        address VARCHAR,
        UNIQUE(phone))
        """)

    new_customer = [( rData['customer_name'], rData['customer_phone'], rData['customer_address'])]
    cursor.executemany("INSERT OR IGNORE INTO Customers VALUES (?,?,?)", new_customer)
    conn.commit()

    if request.method == 'GET':
        return jsonify({'status' : 'success GET'})
    else:
        return jsonify({'status' : rData['customer_name']})   

@app.route('/add_product_customer', methods=['GET', 'POST'])
# @token_required
def add_product_customer():
    # rData = request.data
    rData = request.get_json()

    conn = create_connection("eMarket.db")
    cursor = conn.cursor()
    
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS Orders(
        customer_phone VARCHAR,
        name VARCHAR,
        category_id VARCHAR,
        in_price REAL,
        out_price REAL,
        src VARCHAR,
        quantity INTEGER,
        total REAL,
        delivery VARCHAR,
        pay VARCHAR,
        status VARCHAR,
        date VARCHAR)
        """)

    today = datetime.now()
    today_d = datetime(today.year, today.month, today.day)
    today_date = today_d.strftime('%F') #convert datetime to YYYY-MM-DD string

    print(today_date)
 
    for item in rData['customer_products']:
        new_checkout_products = []
        new_checkout_products = [(rData['customer_phone'], item['name'], item['category_id'], item['in_price'], item['out_price'], item['src'], item['quantity'], item['total'], rData['customer_delivery'], rData['customer_pay'], "new", today_date)]
        cursor.executemany("INSERT INTO Orders VALUES (?,?,?,?,?,?,?,?,?,?,?,?)", new_checkout_products)
    
    
    # # emulate Orders table:
    # today_d = datetime(2019, 1, 1)
    # today_date = today_d.strftime('%F') #convert datetime to YYYY-MM-DD string
    # for num_weeks in range(209):
    #     new_checkout_products_1 = [("001", "Зошит 2", "Зошити", "25", "30", "images/copybooks/cb2.png", "3", "90", "Самовивіз", "На картку ПриватБанку", "new", today_date)]
    #     today_date = today_d.strftime('%F') #convert datetime to YYYY-MM-DD string
    #     cursor.executemany("INSERT INTO Orders VALUES (?,?,?,?,?,?,?,?,?,?,?,?)", new_checkout_products_1)
    #     today_d += timedelta(days=1)

    #     new_checkout_products_2 = [("002", "Калькулятор 2", "Калькулятори", "250", "300", "images/calculators/calc2.png", "2", "600", "Доставка Новою поштою", "Накладений платіж", "new", today_date)]
    #     today_date = today_d.strftime('%F') #convert datetime to YYYY-MM-DD string
    #     cursor.executemany("INSERT INTO Orders VALUES (?,?,?,?,?,?,?,?,?,?,?,?)", new_checkout_products_2)
    #     today_d += timedelta(days=1)

    #     new_checkout_products_3 = [("003", "Карандаші 1", "Карандаші", "25", "30", "images/pencils/penc1.png", "4", "120", "Доставка Новою поштою", "Накладений платіж", "new", today_date)]
    #     today_date = today_d.strftime('%F') #convert datetime to YYYY-MM-DD string
    #     cursor.executemany("INSERT INTO Orders VALUES (?,?,?,?,?,?,?,?,?,?,?,?)", new_checkout_products_3)
    #     today_d += timedelta(days=1)

    #     new_checkout_products_4 = [("004", "Дрібниці 1", "Дрібниці", "20", "30", "images/nothingness/noth1.png", "2", "60", "Доставка Новою поштою", "Накладений платіж", "new", today_date)]
    #     today_date = today_d.strftime('%F') #convert datetime to YYYY-MM-DD string
    #     cursor.executemany("INSERT INTO Orders VALUES (?,?,?,?,?,?,?,?,?,?,?,?)", new_checkout_products_4)
    #     today_d += timedelta(days=1)

    #     new_checkout_products_5 = [("005", "ДляШколи 1", "ДляШколи", "200", "300", "images/school/sch1.png", "2", "600", "Самовивіз", "На картку ПриватБанку", "new", today_date)]
    #     today_date = today_d.strftime('%F') #convert datetime to YYYY-MM-DD string
    #     cursor.executemany("INSERT INTO Orders VALUES (?,?,?,?,?,?,?,?,?,?,?,?)", new_checkout_products_5)
    #     today_d += timedelta(days=1)

    #     new_checkout_products_6 = [("006", "Калькулятор 3", "Калькулятори", "200", "300", "images/calculators/calc3.png", "1", "300", "Доставка Новою поштою", "Накладений платіж", "new", today_date)]
    #     today_date = today_d.strftime('%F') #convert datetime to YYYY-MM-DD string
    #     cursor.executemany("INSERT INTO Orders VALUES (?,?,?,?,?,?,?,?,?,?,?,?)", new_checkout_products_6)
    #     today_d += timedelta(days=1)

    #     new_checkout_products_7 = [("007", "ДляШколи 2", "ДляШколи", "200", "300", "images/school/sch2.png", "2", "600", "Доставка Новою поштою", "Накладений платіж", "new", today_date)]
    #     today_date = today_d.strftime('%F') #convert datetime to YYYY-MM-DD string
    #     cursor.executemany("INSERT INTO Orders VALUES (?,?,?,?,?,?,?,?,?,?,?,?)", new_checkout_products_7)
    #     today_d += timedelta(days=1)

    #     num_weeks += 1
    
    
    
    conn.commit()

    if request.method == 'GET':
        return jsonify({'status' : 'success GET'})
    else:
        return jsonify({'status' : rData['customer_phone']}) 

#function for calculation the amount value for some period (from result of query):
def amount_for_the_period(sampling_for_the_period):
    total = 0
    exp_total = 0
    for val in sampling_for_the_period:
        total = total + int(val[7]) #val[7] is the Total column of the Orders table
        exp_total =exp_total + int(val[3]*val[6]) #val[3] is the in_price column of the Orders table, val[6] - quantity
    return total, exp_total

#function for transfering table date value into date format:
def table_date_to_date(table_date_format):
    date_format = datetime.strptime(table_date_format, '%Y-%m-%d') # convert YYYY-MM-DD string to datetime format
    # table_date_list = table_date_format.split(",")
    # date_format = datetime(int(table_date_list[0]), int(table_date_list[1]), int(table_date_list[2]))
    return date_format

#function for calculation the labels and the total values for some period (from result of query):
def labels_for_the_period(sampling_for_the_period, from_date, to_date):
    
    fd = table_date_to_date(from_date)
    td = table_date_to_date(to_date)
    period_duration_date = td - fd
    period_duration = period_duration_date.days # number of days
    if period_duration < 7 :
        delta = 1 # day
         # number of days:
        number_of_labels = period_duration + 1
    elif period_duration>=7 and period_duration <= 31 :
        delta = 7 # week 
        # number of weeks:
        number_of_labels = period_duration // delta  # operator // get divisor only integer value
        # test = 1
    elif period_duration > 31 and period_duration <= 365 :
        delta = 30 # month 
         # number of months:
        number_of_labels = period_duration // delta
        # test = 1
    else :
        delta = 365 # year
         # number of years:
        number_of_labels = period_duration // delta

    full_labels = [] # array of total sales
    exp_full_labels = [] # array of expenses
    labels = []
    labels_in_data_format = []

    # create an array of labels at the time axis
    for i in range(number_of_labels+1):
        labels_in_data_format.append(fd)
        if delta > 1 : 
            fd += timedelta(days=delta)
        labels.append(str(fd.day) + '.' + str(fd.month) + '.' + str(fd.year))
        if delta == 1 :
             fd += timedelta(days=delta)
    
    for i in range(number_of_labels): 
        total_for_delta = 0
        exp_total_for_delta=0
        for val in sampling_for_the_period: 
            # val[11] is a time column
            current_date = table_date_to_date(val[11])
            # summarize for the period of one delta:
            if(current_date >= labels_in_data_format[i] and current_date < labels_in_data_format[i+1]) :
                total_for_delta = total_for_delta + val[7] #val[7] is the Total column of the Orders table
                exp_total_for_delta = exp_total_for_delta + val[3]*val[6] # val[3] is the in_price column, val[6] - quantity
              
        full_labels.append({labels[i]:total_for_delta}) 
        exp_full_labels.append({labels[i]:exp_total_for_delta})
        i = i + 1
        fd += timedelta(days=delta)
    
    return full_labels, exp_full_labels
    

@app.route('/total_graph', methods=['GET', 'POST'])
def total_sales():
    rData = request.get_json()
    from_period = rData['from_period']
    to_period = rData['to_period']
    conn = create_connection("eMarket.db")
    cursor = conn.cursor()
    
    # check if data exists:
    
    count = cursor.execute("""SELECT * FROM Orders WHERE Orders.date BETWEEN'"""+from_period+"""' AND '"""+to_period+"""'""")
    #count = cursor.execute("""SELECT * FROM Orders WHERE Orders.date BETWEEN '2019-01-07' AND '2019-01-10'""")
    count = len(count.fetchall())
    print (count)
    
    if count == 0:
        
        full_labels = [{'0':0},{'0':0},{'0':0},{'0':0},{'0':0},{'0':0},{'0':0}]
        return jsonify(full_labels)
    else: 
        # get data for total graphs:
        cursor.execute("""SELECT *
                        FROM Orders                       
                    WHERE Orders.date BETWEEN'"""+from_period+"""' AND '"""+to_period+"""'""")
        
        result_of_query=cursor.fetchall() # total sales values of all categories
        sales_labels, expenses_labels = labels_for_the_period(result_of_query, from_period, to_period)
        total_sales, total_expenses = amount_for_the_period(result_of_query)
        
        # get data for graphs in each category:
        cursor.execute("SELECT category_id FROM Categories") # get all category_id
        
        result_of_query_category_id=cursor.fetchall() 
        
        sales_labels_categories = [] # list of sales_labels for each category
        total_sales_categories = [] # list of total_sales for each category
        
        for val in result_of_query_category_id:
            cursor.execute("""SELECT * FROM Orders                       
                    WHERE Orders.date BETWEEN'"""+from_period+"""' 
                    AND '"""+to_period+"""'
                    AND Orders.category_id ='"""+val[0]+"""' """)
            
            result_of_query=cursor.fetchall() # total sales values of selected category
            sales_labels_category, expenses_labels_category = labels_for_the_period(result_of_query, from_period, to_period)
            total_sales_category, total_expenses_category = amount_for_the_period(result_of_query)
            
            sales_labels_categories.append(sales_labels_category)
            total_sales_categories.append(total_sales_category)
                 
            cursor.execute("select * from Categories") 
            rows = cursor.fetchall()

        return jsonify({'sales_labels' : sales_labels, 'expenses_labels' : expenses_labels, 
        'sales_labels_categories': sales_labels_categories, 'total_sales' : total_sales,
        'total_sales_categories': total_sales_categories, 'total_expenses' : total_expenses,
        'category_id' : [row[0] for row in rows], # column1
        'category_name' : [row[1] for row in rows], # column2
        'category_code' : [row[2] for row in rows], # column3
        'name' : [row[3] for row in rows], # column4
        'photo' : [row[4] for row in rows], # column5
        }) 


@app.route('/orders', methods=['GET', 'POST'])
def orders():
    # rData = request.get_json()
    conn = create_connection("eMarket.db")
    cursor = conn.cursor()
    cursor.execute("""SELECT * FROM Orders""")
    orders=cursor.fetchall() # total sales values of selected category
    ordersJson = jsonify(orders)
    return ordersJson


@app.route('/prediction', methods=['GET', 'POST'])
def prediction():
    rData = request.get_json()
    from_period = rData['from_period']
    to_period = rData['to_period']

   
   
    def create_connection(db_file):
        try:
            conn = sqlite3.connect(db_file)
            return conn
        except sqlite3.Error as e:
            print(e)
    
        return None

    #function for convertation of sqlite table YYYY-MM-DD date string to python datetime format:
    def table_date_to_date(table_date_format):
        date_format = datetime.strptime(table_date_format, '%Y-%m-%d') # convert YYYY-MM-DD string to datetime format
        return date_format

    test1=relativedelta(months=+1)
    delta=table_date_to_date(to_period)-table_date_to_date(from_period)
    if(delta.days<=31):
       
        return jsonify({'total_predict' : 'no correct'})
    else:
        
        conn = create_connection("eMarket.db")


        fd = table_date_to_date(to_period)
        to_period_correct_for_month= fd+relativedelta(months=+1) #for correct evaluation of profit_every_month_df in for cicle
        to_period_correct_for_month_string = to_period_correct_for_month.strftime('%F') #convert datetime to YYYY-MM-DD string

        fd = table_date_to_date(to_period)
        to_period_correct_for_end_index= fd+relativedelta(months=-1) #for correct evaluation of end index in training
        to_period_correct_for_end_index_string = to_period_correct_for_end_index.strftime('%F') #convert datetime to YYYY-MM-DD string

        df = pd.read_sql_query("""SELECT in_price, quantity, total, date FROM Orders WHERE Orders.date BETWEEN'"""+from_period+"""' AND '"""+to_period_correct_for_month_string+"""'""", conn)

        in_total = df['in_price']*df['quantity']
        profit_df = df['total']-in_total
        # profit every day:
        profit_every_day_df = pd.DataFrame(columns=['date','total_profit'])
        prev_day=None
        current_profit = 0
        for index, current_day in enumerate(df['date']):
            if prev_day==current_day:
                current_profit=current_profit+profit_df[index]
            else:
                # if prev_day!=current day
                if(prev_day!=None):
                    profit_every_day_df=profit_every_day_df.append({'date':prev_day, 'total_profit':current_profit}, ignore_index=True)

                prev_day=current_day
                current_profit=profit_df[index]
            
        # profit every month:
        profit_every_month_df = pd.DataFrame(columns=['date','total_profit'])
        prev_month=None
        prev_year=None
        prev_date=None
        current_profit = 0
        profit_every_day_df_without_date = profit_every_day_df['total_profit']


        for index, current_day in enumerate(profit_every_day_df['date']):
            # work with month
            datetime_object = datetime.strptime(current_day, '%Y-%m-%d')
            current_month = datetime_object.month
            current_year = datetime_object.year

            if prev_month==current_month and prev_year==current_year: 
                current_profit=current_profit+profit_every_day_df_without_date[index]
                
            else:  
                if(prev_month!=None):
                    profit_every_month_df=profit_every_month_df.append({'date':prev_date, 'total_profit':current_profit}, ignore_index=True)
                
                prev_month=current_month
                prev_year = current_year
                prev_date = current_day
                
                current_profit=profit_every_day_df_without_date[index]

        conn.close()

        # mpl.rcParams['axes.labelsize'] = 20
        # mpl.rcParams['axes.titlesize'] = 24
        # mpl.rcParams['figure.figsize'] = (8, 4)
        # mpl.rcParams['xtick.labelsize'] = 14
        # mpl.rcParams['ytick.labelsize'] = 14
        # mpl.rcParams['legend.fontsize'] = 14
        # ax=profit_every_month_df.plot()
        # ax.set_ylabel('total_profit')

        # # let's make only five xticks from our all xticks:
        # all_size=len(profit_every_month_df.date)
        # part_size = int(all_size/5)
        # cutted_profit_every_month_df_date=pd.DataFrame(columns=['date'])
        # for index, val in  enumerate(profit_every_month_df['date']):
        #     if index%part_size==0:
        #         cutted_profit_every_month_df_date=cutted_profit_every_month_df_date.append({'date':val}, ignore_index=True)

        # ax.set(xticklabels=cutted_profit_every_month_df_date.date)

        # plt.show()


        # regration:
        # https://www.ethanrosenthal.com/2018/01/28/time-series-for-scikit-learn-people-part1/

        start = int(np.where(profit_every_month_df.date == from_period)[0][0])
        end =  int(np.where(profit_every_month_df.date == to_period_correct_for_end_index_string)[0][0]) 

        y_data = profit_every_month_df.total_profit.tolist()

        if len(y_data) <= 4:
            y_pred = np.average(y_data)
            print('predicted value:', y_pred)
        else:
            window=(int(len(y_data)/2)) 
            num_samples=len(y_data)-window

            X_mat = []
            y_mat = []
            t = len(y_data) - 1 # номер последнего временного отсчета обучающей серии
            for i in range(num_samples):
                # Slice a window of features
                X_mat.append(profit_every_month_df.total_profit.iloc[t- i - window : t - i].values)
                y_mat.append(profit_every_month_df.total_profit.iloc[t - i : t - i + 1].values)

            X_mat = np.vstack(X_mat)
            y_mat = np.concatenate(y_mat)

            model = LinearRegression().fit(X_mat, y_mat)

            # задаем интересующие нас значения матрицы Х, соответствующие прогнозируемой точке t + 1:
            X_mat = []
            t = t + 1
            for i in range(num_samples):
                # Slice a window of features
                X_mat.append(profit_every_month_df.total_profit.iloc[t- i - window : t - i].values)

            X_mat = np.vstack(X_mat)
            y_pred = model.predict(X_mat)

            print('predicted value=', y_pred[0])
            pred=int(y_pred[0])
            
            return jsonify({'total_predict' : pred})


@token_required
def orders(username):
    if(username=='sm'):
        # rData = request.get_json()
        conn = create_connection("eMarket.db")
        cursor = conn.cursor()
        cursor.execute("""SELECT * FROM Orders""")
        orders=cursor.fetchall() # total sales values of selected category
        ordersJson = jsonify(orders)
        return ordersJson
    else:
        abort(403)

@app.route('/order', methods=['GET', 'POST'])
@token_required
def order(username):
    if(username=='sm'):
        rData = request.get_json()
        arguments=[]
        arguments = [(rData['mydata'],rData['statusId'])]

        conn = create_connection("eMarket.db")
        cursor = conn.cursor()

        # cursor.execute("""SELECT * FROM Orders""")
        # orders=cursor.fetchall() # total sales values of selected category
        # ordersJson = jsonify(orders)

        cursor.executemany("UPDATE Orders SET status= ? WHERE rowid= ? ", arguments)
        conn.commit()

        return jsonify({'status' : 'success GET'})
    else:
        abort(403)

@app.route('/userorders', methods=['GET', 'POST'])
@token_required
def userorders(username):
        rData = request.get_json()
        phone= rData['data']
        conn = create_connection("eMarket.db")
        cursor = conn.cursor()
        cursor.execute("""SELECT * FROM Orders WHERE customer_phone==?""", [(phone)])
        orders=cursor.fetchall() # total sales values of selected category
        ordersJson = jsonify(orders)
        return ordersJson   
#<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

if __name__ == '__main__':
     app.run(debug = True)

# SELECT products01.total, products011.total, products0111.total
#   FROM products01 
#   JOIN products011 ON (products011.date = products01.date)
#   JOIN products0111 ON (products0111.date = products011.date)
#  WHERE products01.date='20191101'