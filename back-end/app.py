from flask import Flask, request
from flask_restful import Resource, Api
from json import dumps

app = Flask(__name__)
api = Api(app)


    
class Tracks(Resource):
    def get(self):
        result={
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
        return result


api.add_resource(Tracks, '/tracks') # Route_2


if __name__ == '__main__':
     app.run(port='5000')