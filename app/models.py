from . import db
import datetime
from werkzeug.security import generate_password_hash

class UserProfile(db.Model):
    __tablename__ = 'new_user_profiles'

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(80), unique=True)
    first_name = db.Column(db.String(80))
    last_name = db.Column(db.String(80))
    username = db.Column(db.String(80), unique=True)
    password = db.Column(db.String(255))
    created_on = db.Column(db.String(80))

    def __init__(self, email, first_name, last_name, username, password):
        self.email = email
        self.first_name = first_name
        self.last_name = last_name
        self.username = username
        self.password = generate_password_hash(password)
        self.created_on = datetime.datetime.now().strftime("%B %d, %Y")

    def is_authenticated(username, password):
        return True

    def is_active(self):
        return True

    def is_anonymous(self):
        return False

    def get_id(self):
        try:
            return unicode(self.id) 
        except NameError:
            return str(self.id)

    def __repr__(self):
        return f"<id={self.id}, email={self.email}, first_name={self.first_name}, last_name={self.last_name}, username={self.username}, created_on={self.created_on}>"

