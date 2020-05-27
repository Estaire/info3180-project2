from flask_wtf import FlaskForm
from wtforms import TextAreaField, StringField, SelectField, PasswordField
from wtforms.validators import DataRequired, InputRequired
from flask_wtf.file import FileField, FileAllowed, FileRequired

class NewUserForm(FlaskForm):
	username = StringField('Username', validators=[InputRequired()])
	password = PasswordField('Password', validators=[InputRequired()])
	firstname = StringField('First Name', validators=[DataRequired()])
	lastname = StringField('Last Name', validators=[DataRequired()])
	email = StringField('Email', validators=[InputRequired()])

class LoginForm(FlaskForm):
    username = StringField('Username', validators=[InputRequired()])
    password = PasswordField('Password', validators=[InputRequired()])

class PostForm(FlaskForm):
	photo = FileField(FileField('Browse', validators=[
	    FileRequired(),
	    FileAllowed(['jpg', 'png'], 'Images only!')
	]))
	caption = TextAreaField('Caption', validators=[DataRequired()])

class UserForm(FlaskForm):
	profile_pic = FileField(FileField('Browse', validators=[
	    FileAllowed(['jpg', 'png'], 'Images only!')
	]))
	firstname = StringField('First Name', validators=[DataRequired()])
	lastname = StringField('Last Name', validators=[DataRequired()])
	username = StringField('Username', validators=[InputRequired()])
	biography = TextAreaField('Biography')
	location = StringField('Location')