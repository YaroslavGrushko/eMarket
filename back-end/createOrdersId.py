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

from app import create_connection
# creating default admin user >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
def alter_table():
    # let's inicizlize db
    # db.init_app(app)
    # let's create db
    with app.app_context():
        conn = create_connection("eMarket.db")
        cursor = conn.cursor()
        # cursor.execute('create table Orders_copy(id integer primary key autoincrement, customer_phone text,name text, category_id text, in_price real, out_price real, src text, quantity integer, total real, delivery text, pay text, status text, date text)')
        cursor.execute('insert into Orders_copy(customer_phone, name, category_id, in_price, out_price, src, quantity, total, delivery, pay, status, date) select customer_phone, name, category_id, in_price, out_price, src, quantity, total, delivery, pay, status, date from Orders')
        cursor.execute('drop table Orders')
        cursor.execute('alter table Orders_copy rename to Orders')
        conn.commit()

    # return redirect(url_for('auth.login'))
# exactly create admin in Db 
alter_table()
# creating default admin user <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

