
from flask import Flask, request, Response
from flask_restful import Resource, Api
from json import dumps
# for has been blocked by CORS policy: Cross origin requests are only error
from flask_cors import CORS, cross_origin
import sqlite3
from datetime import datetime


app = Flask(__name__)
CORS(app)
api = Api(app)

conn = sqlite3.connect("eMarket.db") # или :memory: чтобы сохранить в RAM
cursor = conn.cursor()
cursor.execute("""CREATE TABLE IF NOT EXISTS "Managers" (
    "manager_id" INTEGER,
    "maneger_name" VARCHAR,
    "maneger_password" VARCHAR,
    "time" DATETIME
)
               """)

# Вставляем множество данных в таблицу используя безопасный метод "?"
managers = [(1, 'Yaroslav', '1234', datetime.now()),
          (2, 'Vladimir', '1234', datetime.now())]
 
cursor.executemany("INSERT INTO Managers VALUES (?,?,?,?)", managers)
conn.commit()

    
class Tracks(Resource):
    def get(self):
         
        resultList={
            'Vasya':
            {
            'age':24,
            'sex':'mail'},
            'Ann':
            {
                'age':22,
                'sex':'femail2'
            }  
        }
        # jsonStr = dumps(resultList, separators=(',', ':'))
        jsonStr = dumps(resultList)
        # resp = Response(result)
        # resp.headers['Access-Control-Allow-Origin'] = 'http://localhost:3000/'
        return jsonStr

api.add_resource(Tracks, '/tracks') # Route_2
# @app.route("/tracks")
# @cross_origin()
# def helloWorld():
#     mystring = "Hello, cross-origin-world!"
#     jsonStr = dumps(mystring, separators=(',', ':'))
#     return jsonStr

if __name__ == '__main__':
     app.run(debug = True)