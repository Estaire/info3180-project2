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
    biography = db.Column(db.String(255))
    password = db.Column(db.String(255))
    img_address = db.Column(db.String(120))
    location = db.Column(db.String(80))
    created_on = db.Column(db.String(80))

    def __init__(self, email, first_name, last_name, username, password, biography, location, img_address):
        self.email = email
        self.first_name = first_name
        self.last_name = last_name
        self.username = username
        self.password = generate_password_hash(password)
        self.img_address = '/static/uploads/'+'no-profile-picture-icon-8.jpg'
        self.biography = biography
        self.location = location
        self.created_on = datetime.datetime.now().strftime("%d %B %Y")

class Follow(db.Model):
    __tablename__ = 'follows'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer)
    follower_id = db.Column(db.Integer)

    def __init__(self, user_id, follower_id):
        self.user_id = user_id
        self.follower_id = follower_id

class Post(db.Model):
    __tablename__ = 'posts'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer)
    photo = db.Column(db.String(120))
    caption = db.Column(db.String(120))
    created_on = db.Column(db.String(80))

    def __init__(self, user_id, photo, caption):
        self.user_id = user_id
        self.photo = photo
        self.caption = caption
        self.created_on = datetime.datetime.now().strftime("%B %d %Y")

class Like(db.Model):
    __tablename__ = 'likes'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer)
    post_id = db.Column(db.Integer)
    likes = db.Column(db.Integer, default=0)

    def __init__(self, user_id, post_id):
        self.user_id = user_id
        self.post_id = post_id
