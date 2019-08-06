
from flask import Flask, request, Response
from flask_restful import Resource, Api
from json import dumps
# for has been blocked by CORS policy: Cross origin requests are only error
from flask_cors import CORS, cross_origin

app = Flask(__name__)
CORS(app)
api = Api(app)


    
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