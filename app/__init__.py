from flask import Flask
from flask_login import LoginManager
from flask_sqlalchemy import SQLAlchemy
from flask_wtf.csrf import CSRFProtect
from flask_jwt_extended import JWTManager


app = Flask(__name__)
csrf = CSRFProtect(app)
app.config['SECRET_KEY'] = 'v\xf9\xf7\x11\x13\x18\xfaMYp\xed_\xe8\xc9w\x06\x8e\xf0f\xd2\xba\xfd\x8c\xda'
app.config['UPLOAD_FOLDER'] = "./app/static/uploads"
app.config['SQLALCHEMY_DATABASE_URI'] = "postgresql://hhmdwmueuuilwl:016ca9a3c043c7a8c0813170f4e0d948ed42d3af35d0810e1d6d8d949632f9da@ec2-3-231-16-122.compute-1.amazonaws.com:5432/d66297mju16g94"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True

app.config.from_object(__name__)
db = SQLAlchemy(app)

login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'login'

jwt = JWTManager(app)

from app import views, models
