from flask import Flask, Response, request
# for template loading
from flask import render_template
# for has been blocked by CORS policy: Cross origin requests are only error
from flask_cors import CORS, cross_origin

from flask_login import LoginManager, UserMixin, login_required

from flask_restful import Resource, Api

# to jsonify objects
from flask import jsonify

app = Flask(__name__)
    # for CROS-ORIGIN bug -fix
CORS(app)
app.config["SECRET_KEY"] = "9OLWxND4o83j4K4iuop1"

login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = "login"
api = Api(app)

class User(UserMixin):
    # proxy for a database of users
    user_database = {"JohnDoe": ("JohnDoe", "John"),
               "JaneDoe": ("JaneDoe", "Jane")}

    def __init__(self, username, password):
        self.id = username
        self.password = password

    @classmethod
    def get(cls,id):
        return cls.user_database.get(id)


@login_manager.request_loader
def load_user(request):
    token = request.headers.get('Authorization')
    if token is None:
        token = request.args.get('token')

    if token is not None:
        username,password = token.split(":") # naive token
        user_entry = User.get(username)
        if (user_entry is not None):
            user = User(user_entry[0],user_entry[1])
            if (user.password == password):
                return user
    return None

@app.route("/login",methods=["POST","GET"])
def login():
    if request.method == 'GET':
        return render_template('test.html', title='DevOps Nokia')
    loginStatus = False
    my_request = request
    user = load_user(my_request)

    if(user):
        loginStatus=True
    # if the above check passes, then we know the user has the right credentials
    return jsonify({'loginStatus' : loginStatus})

@app.route("/free",methods=["GET"])
def myfree():
    return Response(response="Hello World!",status=200)


@app.route("/protected",methods=["GET"])
@login_required
def protected():
    return Response(response="Hello Protected World!", status=200)


if __name__ == '__main__':
    
    app.run(port=5000,debug=True)