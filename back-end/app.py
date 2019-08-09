
from flask import Flask, request, Response
from flask_restful import Resource, Api
from json import dumps
# for has been blocked by CORS policy: Cross origin requests are only error
from flask_cors import CORS, cross_origin
import sqlite3
from sqlite3 import Error
from datetime import datetime
from flask import jsonify


app = Flask(__name__)
CORS(app)
api = Api(app)

# conn = sqlite3.connect("eMarket.db") # или :memory: чтобы сохранить в RAM

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



@app.route('/add_categories', methods=['GET', 'POST'])
# @login_required
def save_category():
    # rData = request.data
    rData = request.get_json()

    conn = create_connection("eMarket.db")
    cursor = conn.cursor()
    cursor.execute("""CREATE TABLE IF NOT EXISTS "Categories" 
    (
    "category_id" VARCHAR,
    "category_name" VARCHAR,
    "category_code" VARCHAR,
    "time" DATETIME
    )
               """)
    # create the initial category table
    # new_category = [('Зошити', 'Блокноти, зошити, альбоми', 'fa fa-book', datetime.now()),
    #                 ('Калькулятори', 'Калькулятори, диктофони', 'fa fa-calculator', datetime.now()),
    #                 ('Папір', 'Папір та копіювальне приладдя', 'fa fa-clone', datetime.now()),
    #                 ('Карандаші', 'Олівці, ручки, стрижні', 'fa fa-edit', datetime.now()),
    #                 ('Дрібниці', 'Канцелярські дрібниці', 'fa fa-eraser', datetime.now()),
    #                 ('ДляШколи', 'Навчальне приладдя', 'fa fa-graduation-cap', datetime.now()),
    #                ]
    # cursor.executemany("INSERT INTO Categories VALUES (?,?,?,?)", new_category)
    # conn.commit()
    
    new_category = [( rData['category_id'], rData['category_name'], rData['category_code'], datetime.now()),]
    cursor.executemany("INSERT INTO Categories VALUES (?,?,?,?)", new_category)
    conn.commit()

    if request.method == 'GET':
        return jsonify({'status' : 'success GET'})
    else:
        return jsonify({'status' : 'success POST'})


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
        return {'category_id' : [row[0] for row in rows], 
                'category_name' : [row[1] for row in rows],
                'category_code' : [row[2] for row in rows]}
    else:
        return jsonify({'status' : 'success POST'})
    




if __name__ == '__main__':
     app.run(debug = True)