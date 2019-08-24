
from flask import Flask, request, Response
from flask_restful import Resource, Api

from flask import Flask, request, jsonify, make_response
from flask_sqlalchemy import SQLAlchemy
import uuid
from werkzeug.security import generate_password_hash, check_password_hash
import jwt

from datetime import datetime
from datetime import timedelta

from functools import wraps


# from json import dumps
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
    """ create a database connection to the SQLite database
        specified by the db_file
    :param db_file: database file
    :return: Connection object or None
    """
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

# # creating default table Зошити>>>>>>>>>>>>>>>>>>>>>>>
# conn = create_connection("eMarket.db") # или :memory: чтобы сохранить в RAM
# cursor = conn.cursor()
# cursor.execute("""CREATE TABLE IF NOT EXISTS "Зошити" 
# (
# "name" VARCHAR,
# "src" VARCHAR,
# "in_price" VARCHAR,
# "out_price" VARCHAR,
# "about" VARCHAR
# )
#             """)

# new_products = [
# ('Зошит 1', 'images/copybooks/cb1.png', '₴20',  '₴30', 'Елегантний зошит у лінійку (48 аркушів) з якісного біосумісного паперу, виготовленого за сучасними еко-технологіями. Висока адгезійна здатність пареру для усіх видів пишучих приладів (олівці, ручки, фламастери). Висока стійкість до фламастерів та стирачок.'),
# ('Зошит 2', 'images/copybooks/cb2.png', '₴25',  '₴30', 'Елегантний зошит у лінійку (96 аркушів) з якісного біосумісного паперу, виготовленого за сучасними еко-технологіями. Висока адгезійна здатність пареру для усіх видів пишучих приладів (олівці, ручки, фламастери). Висока стійкість до фламастерів та стирачок.'),
# ('Зошит 3', 'images/copybooks/cb3.png', '₴30',  '₴30', 'Практичний та приємний на дотик зошит у клітинку (48 аркушів) з якісного біосумісного паперу, виготовленого за сучасними еко-технологіями. Висока адгезійна здатність пареру для усіх видів пишучих приладів (олівці, ручки, фламастери). Висока стійкість до фламастерів та стирачок.'),
# ('Зошит 4', 'images/copybooks/cb4.png', '₴20',  '₴30', 'Практичний та приємний на дотик зошит у клітинку (48 аркушів) з якісного біосумісного паперу, виготовленого за сучасними еко-технологіями. Висока адгезійна здатність пареру для усіх видів пишучих приладів (олівці, ручки, фламастери). Висока стійкість до фламастерів та стирачок.'),               
#                 ]
# cursor.executemany("INSERT INTO Зошити VALUES (?,?,?,?,?)", new_products)
# conn.commit()
# # <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
# # <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<


# # creating default table Калькулятори>>>>>>>>>>>>>>>>>>>>>>>
# conn = create_connection("eMarket.db") # или :memory: чтобы сохранить в RAM
# cursor = conn.cursor()
# cursor.execute("""CREATE TABLE IF NOT EXISTS "Калькулятори" 
# (
# "name" VARCHAR,
# "src" VARCHAR,
# "in_price" VARCHAR,
# "out_price" VARCHAR,
# "about" VARCHAR
# )
#             """)
            
# new_products = [
# ('Калькулятор 1', 'images/calculators/calc1.png', '₴20', '₴30', 'Сучасний ергономічний калькулятор з функцією голосового набору'),
# ('Калькулятор 2', 'images/calculators/calc2.png', '₴25', '₴30', 'Сучасний ергономічний калькулятор з функцією голосового набору та сонячними елементами живлення.'),
# ('Калькулятор 3', 'images/calculators/calc3.png', '₴20', '₴30', 'Сучасний ергономічний калькулятор з функцією голосового набору та сонячними елементами живлення.'),
# ('Калькулятор 4', 'images/calculators/calc4.png', '₴20', '₴30', 'Практичний та зручний калькулятор з функцією з сонячними елементами живлення.'),               
#                 ]
# cursor.executemany("INSERT INTO Калькулятори VALUES (?,?,?,?,?)", new_products)
# conn.commit()
# # <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
# # <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

# # creating default table Папір>>>>>>>>>>>>>>>>>>>>>>>
# conn = create_connection("eMarket.db") # или :memory: чтобы сохранить в RAM
# cursor = conn.cursor()
# cursor.execute("""CREATE TABLE IF NOT EXISTS "Папір" 
# (
# "name" VARCHAR,
# "src" VARCHAR,
# "in_price" VARCHAR,
# "out_price" VARCHAR,
# "about" VARCHAR
# )
#             """)
            
# new_products = [
# ('Папір 1', 'images/paper/paper1.png', '₴5', '₴10', 'Високоякісний папір для лазерних принтерів.'),
# ('Папір 2', 'images/paper/paper2.png', '₴5', '₴10', 'Приємний на дотик високоякісний папір для струйних принтерів.'),
# ('Папір 3', 'images/paper/paper3.png', '₴5', '₴10', 'Високоякісний папір для лазерних та струйних принтерів.'),               
#                 ]
# cursor.executemany("INSERT INTO Папір VALUES (?,?,?,?,?)", new_products)
# conn.commit()
# # <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
# # <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<


# # creating default table Карандаші>>>>>>>>>>>>>>>>>>>>>>>
# conn = create_connection("eMarket.db") # или :memory: чтобы сохранить в RAM
# cursor = conn.cursor()
# cursor.execute("""CREATE TABLE IF NOT EXISTS "Карандаші" 
# (
# "name" VARCHAR,
# "src" VARCHAR,
# "in_price" VARCHAR,
# "out_price" VARCHAR,
# "about" VARCHAR
# )
#             """)
            
# new_products = [
# ('Карандаші 1', 'images/pencils/penc1.png', '₴20', '₴30', 'Твердогрифельні прості карандаші для креслення.'),
# ('Карандаші 2', 'images/pencils/penc2.png', '₴20', '₴30', 'Високоякісні карандаші з різноманітною твердістю гифеля для графіки та креслення.'),
# ('Карандаші 3', 'images/pencils/penc3.png', '₴20', '₴30', 'Кольорові олівці для малювання з біосумісного грифелю.'), 
# ('Ручки 1', 'images/pencils/penc4.png', '₴20', '₴30', 'Високоякісні автоматичні кулькові ручки.'),
# ('Ручки 2', 'images/pencils/penc5.png', '₴15', '₴30', 'Стильні ергономічні ручки для ділових людей.'),
# ('Ручки 3', 'images/pencils/penc6.png', '₴20', '₴30', 'Високоякісні автоматичні кулькові ручки з підвищеною адгезією чернил до бумаги.'),
# ('Стержень 1', 'images/pencils/penc7.png', '₴20', '₴30', 'Високоякісні стрижні з стійкими чорнилами.'),
# ('Стержень 2', 'images/pencils/penc8.png', '₴20', '₴30', 'Високоякісні стрижні з стійкими чорнилами та підвищеною адгезією до бумаги.'),            
#                 ]
# cursor.executemany("INSERT INTO Карандаші VALUES (?,?,?,?,?)", new_products)
# conn.commit()
# # <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
# # <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

# # creating default table Дрібниці>>>>>>>>>>>>>>>>>>>>>>>
# conn = create_connection("eMarket.db") # или :memory: чтобы сохранить в RAM
# cursor = conn.cursor()
# cursor.execute("""CREATE TABLE IF NOT EXISTS "Дрібниці" 
# (
# "name" VARCHAR,
# "src" VARCHAR,
# "in_price" VARCHAR,
# "out_price" VARCHAR,
# "about" VARCHAR
# )
#             """)

# new_products = [
# ('Дрібниці 1', 'images/nothingness/noth1.png', '₴20', '₴30', 'Біосумісні коректори та канцелярські клеї з високою склеючою здатністю.'),
# ('Дрібниці 2', 'images/nothingness/noth2.png', '₴20', '₴30', 'Приємні на вигляд та пружні скріпки для пареру та файлів.'),
# ('Дрібниці 3', 'images/nothingness/noth3.png', '₴20', '₴30', 'Комбіновані гнучки та практичні лінійки'),
# ('Дрібниці 4', 'images/nothingness/noth4.png', '₴20', '₴30', 'Скоби для степлерів з високоякісної сталі'),
# ('Дрібниці 5', 'images/nothingness/noth5.png', '₴20', '₴30', 'Стильні бейджеки зі зручним кріпленням'),
#                 ]
# cursor.executemany("INSERT INTO Дрібниці VALUES (?,?,?,?,?)", new_products)
# conn.commit()
# # <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
# # <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

# # creating default table ДляШколи>>>>>>>>>>>>>>>>>>>>>>>
# conn = create_connection("eMarket.db") # или :memory: чтобы сохранить в RAM
# cursor = conn.cursor()
# cursor.execute("""CREATE TABLE IF NOT EXISTS "ДляШколи" 
# (
# "name" VARCHAR,
# "src" VARCHAR,
# "in_price" VARCHAR,
# "out_price" VARCHAR,
# "about" VARCHAR
# )
#             """)

# new_products = [
# ('ДляШколи 1', 'images/school/sch1.png', '₴20', '₴30', 'Біосумісні ортопедичні стильні дівочі ранці.'),
# ('ДляШколи 2', 'images/school/sch2.png', '₴20', '₴30', 'Біосумісні отропедичні чоловічі ранці підвищеної міцності.'),
# ('ДляШколи 3', 'images/school/sch3.png', '₴20', '₴30', 'Спортивні ергономічні сумки з біосумісних матеріалів.'),
# ('ДляШколи 4', 'images/school/sch4.png', '₴20', '₴30', 'Обкладенки для книжок та зошитів з екологічного поліетилену'),
# ('ДляШколи 5', 'images/school/sch5.png', '₴20', '₴30', 'Обкладенки для паперів з екологічного поліетилену'),
#                 ]
# cursor.executemany("INSERT INTO ДляШколи VALUES (?,?,?,?,?)", new_products)
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

        if 'x-access-token' in request.headers:
            token = request.headers['x-access-token']

        if not token:
            return jsonify({'message' : 'Token is missing!'}), 401

        try: 
            data = jwt.decode(token, app.config['SECRET_KEY'])
            current_user = User.query.filter_by(public_id=data['public_id']).first()
        except:
            return jsonify({'message' : 'Token is invalid!'}), 401

        return f(*args, **kwargs)

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


#DB-routes>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

@app.route('/read_categories', methods=['GET', 'POST'])
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

@app.route('/add_categories', methods=['GET', 'POST'])
@token_required
def save_category():
    # rData = request.data
    rData = request.get_json()

    conn = create_connection("eMarket.db")
    cursor = conn.cursor()
    
    new_category = [( rData['category_id'], rData['category_name'], rData['category_code'], datetime.now()),]
    cursor.executemany("INSERT INTO Categories VALUES (?,?,?,?)", new_category)
    conn.commit()

    if request.method == 'GET':
        return jsonify({'status' : 'success GET'})
    else:
        return jsonify({'status' : 'adding successfully'})

    
@app.route('/delete_category', methods=['GET', 'POST'])
@token_required
def delete_category():

    rData = request.get_json()
    # data = json.loads(rData)
    conn = create_connection("eMarket.db")
    cursor = conn.cursor()
    cursor.execute("DELETE FROM Categories WHERE category_id ="+"'"+str(rData)+"'")
    conn.commit()
    return 'Ok'

@app.route('/read_product', methods=['GET', 'POST'])

def read_products():
    rData = request.data
    rData = request.get_json()

    conn = create_connection("eMarket.db")
    cursor = conn.cursor()
    # before reading check if the table exists:
    cursor.execute("SELECT count(*) FROM sqlite_master WHERE type='table' AND name='"+rData+"'")
    # to get a tuple with one element, the value of COUNT(*):
    result_of_query=cursor.fetchone()
    # to find the value of count(*) (0 if table no exist and 1 if  table exist):
    value_of_count=result_of_query[0]
    if value_of_count==0:
        return jsonify({'name_of_not_exist_table' : rData})
    else: 
        cursor.execute("select * from "+ rData) # This line performs query and returns json result
        rows = cursor.fetchall()
        return jsonify(rows) 

@app.route('/add_product', methods=['GET', 'POST'])
@token_required
def add_product():
    # rData = request.data
    rData = request.get_json()

    conn = create_connection("eMarket.db")
    cursor = conn.cursor()
    
    # cursor.execute('create table if not exists ' + rData['Product_Name'] + 
    # '(name VARCHAR, src VARCHAR, in_price VARCHAR, out_price VARCHAR, about VARCHAR)')
    
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS """ + rData['Current_Category'] +"""(
        name VARCHAR,
        src VARCHAR,
        in_price VARCHAR,
        out_price VARCHAR,
        about VARCHAR)
        """)

    new_product = [( rData['Product_Name'], rData['Product_Photo'], rData['Product_In_Price'], rData['Product_Out_Price'], rData['Product_About'])]
    cursor.executemany("INSERT INTO " + rData['Current_Category'] +" VALUES (?,?,?,?,?)", new_product)
    conn.commit()

    if request.method == 'GET':
        return jsonify({'status' : 'success GET'})
    else:
        return jsonify({'status' : rData['Current_Category']})

@app.route('/user', methods=['GET'])
@token_required
# def get_all_users(current_user):
def get_all_users():   

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

#<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

if __name__ == '__main__':
     app.run(debug = True)