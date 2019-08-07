
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



@app.route('/categories', methods=['GET', 'POST'])
# @login_required
def save_category():
    # rData = request.data
    rData = request.get_json()

    conn = create_connection("eMarket.db")
    cursor = conn.cursor()
    cursor.execute("""CREATE TABLE IF NOT EXISTS "Categories" 
    (
    "manager_id" INTEGER,
    "maneger_name" VARCHAR,
    "category_name" VARCHAR,
    "category_code" VARCHAR,
    "time" DATETIME
    )
               """)
    new_category = [(rData['manager_id'], rData['manager_name'], rData['category_name'], rData['category_code'], datetime.now()),]
    cursor.executemany("INSERT INTO Categories VALUES (?,?,?,?,?)", new_category)
    conn.commit()

    if request.method == 'GET':
        return jsonify({'status' : 'success GET'})
    else:
        return jsonify({'status' : 'success POST'})




if __name__ == '__main__':
     app.run(debug = True)