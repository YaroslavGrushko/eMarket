
from flask import Flask, request, Response
from flask_restful import Resource, Api
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
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///db.sqlite'
# for user authentification in SQLite Db <<<<<<<<<<<<

# let's inicizlize db
db.init_app(app)

# let's import user model from db
from models import User
# A user loader tells Flask-Login how to find
# a specific user from the ID that is stored in their session cookie
# >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> 
login_manager = LoginManager()
# login_manager.session_protection = 'strong'
login_manager.login_view = 'auth.login'
login_manager.init_app(app)

@login_manager.user_loader
def load_user(user_id):
    # since the user_id is just the primary key of our user table, use it in the query for the user
    return User.query.get(int(user_id))
# <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

# blueprint for auth routes in our app
# this is import auth.py from auth.py :)
from auth import auth as auth_blueprint
app.register_blueprint(auth_blueprint)

# blueprint for non-auth parts of app
# this is import main.py from main.py :)
from main import main as main_blueprint
app.register_blueprint(main_blueprint)

api = Api(app)



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

# creating default admin user >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
def signup_admin():
    # let's create db
    with app.app_context():
        db.create_all()
        # # let's import user model from db
        # from models import User

        # name = request.form.get('name')
        # password = request.form.get('password')
        name = 'admin'
        password = 'admin'
        user = User.query.filter_by(name=name).first() # if this returns a user, then the email already exists in database

        if user: # if a user is found, we want to redirect back to signup page so user can try again
            # return redirect(url_for('auth.signup'))
            return 'it is ALREADY exists ADMIN'
        # create new user with the form data. Hash the password so plaintext version isn't saved.
        new_user = User(name=name, password=generate_password_hash(password, method='sha256'))

        # add the new user to the database
        db.session.add(new_user)
        db.session.commit()

    # return redirect(url_for('auth.login'))
# exactly create admin in Db 
# signup_admin()
# creating default admin user <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<



# # creating default table with it content>>>>>>>>>>>>>>>>>>>>>>>
# # >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
# conn = create_connection("eMarket.db") # или :memory: чтобы сохранить в RAM
# cursor = conn.cursor()
# # drop table
# DROPsql = "DROP TABLE Categories"
# cursor.execute(DROPsql)

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
# "price" VARCHAR,
# "about" VARCHAR
# )
#             """)

# new_products = [
# ('Зошит 1', 'images/copybooks/cb1.png', '₴30', 'Елегантний зошит у лінійку (48 аркушів) з якісного біосумісного паперу, виготовленого за сучасними еко-технологіями. Висока адгезійна здатність пареру для усіх видів пишучих приладів (олівці, ручки, фламастери). Висока стійкість до фламастерів та стирачок.'),
# ('Зошит 2', 'images/copybooks/cb2.png', '₴35', 'Елегантний зошит у лінійку (96 аркушів) з якісного біосумісного паперу, виготовленого за сучасними еко-технологіями. Висока адгезійна здатність пареру для усіх видів пишучих приладів (олівці, ручки, фламастери). Висока стійкість до фламастерів та стирачок.'),
# ('Зошит 3', 'images/copybooks/cb3.png', '₴40', 'Практичний та приємний на дотик зошит у клітинку (48 аркушів) з якісного біосумісного паперу, виготовленого за сучасними еко-технологіями. Висока адгезійна здатність пареру для усіх видів пишучих приладів (олівці, ручки, фламастери). Висока стійкість до фламастерів та стирачок.'),
# ('Зошит 4', 'images/copybooks/cb4.png', '₴30', 'Практичний та приємний на дотик зошит у клітинку (48 аркушів) з якісного біосумісного паперу, виготовленого за сучасними еко-технологіями. Висока адгезійна здатність пареру для усіх видів пишучих приладів (олівці, ручки, фламастери). Висока стійкість до фламастерів та стирачок.'),               
#                 ]
# cursor.executemany("INSERT INTO Зошити VALUES (?,?,?,?)", new_products)
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
# "price" VARCHAR,
# "about" VARCHAR
# )
#             """)
            
# new_products = [
# ('Калькулятор 1', 'images/calculators/calc1.png', '₴30', 'Сучасний ергономічний калькулятор з функцією голосового набору'),
# ('Калькулятор 2', 'images/calculators/calc2.png', '₴35', 'Сучасний ергономічний калькулятор з функцією голосового набору та сонячними елементами живлення.'),
# ('Калькулятор 3', 'images/calculators/calc3.png', '₴40', 'Сучасний ергономічний калькулятор з функцією голосового набору та сонячними елементами живлення.'),
# ('Калькулятор 4', 'images/calculators/calc4.png', '₴30', 'Практичний та зручний калькулятор з функцією з сонячними елементами живлення.'),               
#                 ]
# cursor.executemany("INSERT INTO Калькулятори VALUES (?,?,?,?)", new_products)
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
# "price" VARCHAR,
# "about" VARCHAR
# )
#             """)
            
# new_products = [
# ('Папір 1', 'images/paper/paper1.png', '₴10', 'Високоякісний папір для лазерних принтерів.'),
# ('Папір 2', 'images/paper/paper2.png', '₴15', 'Приємний на дотик високоякісний папір для струйних принтерів.'),
# ('Папір 3', 'images/paper/paper3.png', '₴20', 'Високоякісний папір для лазерних та струйних принтерів.'),               
#                 ]
# cursor.executemany("INSERT INTO Папір VALUES (?,?,?,?)", new_products)
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
# "price" VARCHAR,
# "about" VARCHAR
# )
#             """)
            
# new_products = [
# ('Карандаші 1', 'images/pencils/penc1.png', '₴30', 'Твердогрифельні прості карандаші для креслення.'),
# ('Карандаші 2', 'images/pencils/penc2.png', '₴45', 'Високоякісні карандаші з різноманітною твердістю гифеля для графіки та креслення.'),
# ('Карандаші 3', 'images/pencils/penc3.png', '₴50', 'Кольорові олівці для малювання з біосумісного грифелю.'), 
# ('Ручки 1', 'images/pencils/penc4.png', '₴30', 'Високоякісні автоматичні кулькові ручки.'),
# ('Ручки 2', 'images/pencils/penc5.png', '₴45', 'Стильні ергономічні ручки для ділових людей.'),
# ('Ручки 3', 'images/pencils/penc6.png', '₴50', 'Високоякісні автоматичні кулькові ручки з підвищеною адгезією чернил до бумаги.'),
# ('Стержень 1', 'images/pencils/penc7.png', '₴10', 'Високоякісні стрижні з стійкими чорнилами.'),
# ('Стержень 2', 'images/pencils/penc8.png', '₴15', 'Високоякісні стрижні з стійкими чорнилами та підвищеною адгезією до бумаги.'),            
#                 ]
# cursor.executemany("INSERT INTO Карандаші VALUES (?,?,?,?)", new_products)
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
# "price" VARCHAR,
# "about" VARCHAR
# )
#             """)

# new_products = [
# ('Дрібниці 1', 'images/nothingness/noth1.png', '₴30', 'Біосумісні коректори та канцелярські клеї з високою склеючою здатністю.'),
# ('Дрібниці 2', 'images/nothingness/noth2.png', '₴20', 'Приємні на вигляд та пружні скріпки для пареру та файлів.'),
# ('Дрібниці 3', 'images/nothingness/noth3.png', '₴50', 'Комбіновані гнучки та практичні лінійки'),
# ('Дрібниці 4', 'images/nothingness/noth4.png', '₴30', 'Скоби для степлерів з високоякісної сталі'),
# ('Дрібниці 5', 'images/nothingness/noth5.png', '₴30', 'Стильні бейджеки зі зручним кріпленням'),
#                 ]
# cursor.executemany("INSERT INTO Дрібниці VALUES (?,?,?,?)", new_products)
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
# "price" VARCHAR,
# "about" VARCHAR
# )
#             """)

# new_products = [
# ('ДляШколи 1', 'images/school/sch1.png', '₴30', 'Біосумісні ортопедичні стильні дівочі ранці.'),
# ('ДляШколи 2', 'images/school/sch2.png', '₴20', 'Біосумісні отропедичні чоловічі ранці підвищеної міцності.'),
# ('ДляШколи 3', 'images/school/sch3.png', '₴50', 'Спортивні ергономічні сумки з біосумісних матеріалів.'),
# ('ДляШколи 4', 'images/school/sch4.png', '₴30', 'Обкладенки для книжок та зошитів з екологічного поліетилену'),
# ('ДляШколи 5', 'images/school/sch5.png', '₴30', 'Обкладенки для паперів з екологічного поліетилену'),
#                 ]
# cursor.executemany("INSERT INTO ДляШколи VALUES (?,?,?,?)", new_products)
# conn.commit()
# # <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
# # <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
# from auth import load_user_from_header

@app.route('/add_categories', methods=['GET', 'POST'])
@login_required
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


@app.route('/read_categories', methods=['GET', 'POST'])
# @login_required
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
    
@app.route('/delete_category', methods=['GET', 'POST'])
@login_required
def delete_category():

    rData = request.get_json()
    # data = json.loads(rData)
    conn = create_connection("eMarket.db")
    cursor = conn.cursor()
    cursor.execute("DELETE FROM Categories WHERE category_id ="+"'"+str(rData)+"'")
    conn.commit()
    return 'Ok'

@app.route('/read_product', methods=['GET', 'POST'])
# @login_required
def read_products():
    rData = request.data
    rData = request.get_json()

    conn = create_connection("eMarket.db")
    cursor = conn.cursor()
    cursor.execute("select * from "+ rData) # This line performs query and returns json result
    rows = cursor.fetchall()

    if request.method == 'POST':
        return jsonify(rows) 
    else:
        return jsonify({'status' : 'success GET'})

if __name__ == '__main__':
     app.run(debug = True)