# for encrypting password
from werkzeug.security import generate_password_hash, check_password_hash
# for creating unique user id
import uuid

# from api import app
# from api import db
# from api import User
from app import app
from app import db
from app import User
# creating default admin user >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
def signup_admin():
    # let's inicizlize db
    db.init_app(app)
    # let's create db
    with app.app_context():
        db.create_all()
        ## admin 
        # name = 'admin'
        # password = 'admin'
        # sales_manager (sm)
        name = 'sm'
        password = 'sm'
        user = User.query.filter_by(name=name).first() # if this returns a user, then the email already exists in database

        if user: # if a user is found, we want to redirect back to signup page so user can try again
            # return redirect(url_for('auth.signup'))
            return 'it is ALREADY exists ADMIN'
        # create new user with the form data. Hash the password so plaintext version isn't saved.
        new_user = User(public_id=str(uuid.uuid4()), name=name, password=generate_password_hash(password, method='sha256'), admin=True)

        # add the new user to the database
        db.session.add(new_user)
        db.session.commit()

    # return redirect(url_for('auth.login'))
# exactly create admin in Db 
signup_admin()
# creating default admin user <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

