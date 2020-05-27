"""
Flask Documentation:     http://flask.pocoo.org/docs/
Jinja2 Documentation:    http://jinja.pocoo.org/2/documentation/
Werkzeug Documentation:  http://werkzeug.pocoo.org/documentation/
This file creates your application.
"""

import os
from app import app, db, login_manager
from flask import render_template, request, jsonify, redirect, url_for, session
from flask_jwt_extended import (
    JWTManager, jwt_required, create_access_token,
    get_jwt_identity
)
from app.forms import NewUserForm, LoginForm, PostForm, UserForm
from app.models import UserProfile, Follow, Post, Like
from flask_login import login_user, logout_user, current_user, login_required
from werkzeug.utils import secure_filename
from werkzeug.security import check_password_hash, generate_password_hash

###
# Routing for your application.
###


# Please create all new routes and view functions above this route.
# This route is now our catch all route for our VueJS single page
# application.
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def index(path):
    """
    Because we use HTML5 history mode in vue-router we need to configure our
    web server to redirect all routes to index.html. Hence the additional route
    "/<path:path".

    Also we will render the initial webpage and then let VueJS take control.
    """
    return render_template('index.html')


@app.route('/api/users/register', methods=['GET','POST'])
def register():
    form = NewUserForm()
    if form.validate_on_submit() and request.method == 'POST':
        user = UserProfile(request.form['email'], request.form['firstname'], request.form['lastname'], request.form['username'], request.form['password'], "", "", "")
        db.session.add(user)
        db.session.commit()
        access_token = create_access_token(identity=request.form['username'])
        return jsonify({'authenticated':True, 'access_token': access_token}), 200
    return jsonify(response=form_errors(form))

@app.route("/api/auth/login", methods=['GET', 'POST'])
def login():
    form = LoginForm()
    if form.validate_on_submit() and request.method == 'POST':
        username = form.username.data
        password = form.password.data
        user = UserProfile.query.filter_by(username=username).first()
        if user is not None and check_password_hash(user.password, password):
            access_token = create_access_token(identity=username)
            return jsonify({'authenticated':True, 'access_token': access_token}), 200
    return jsonify({'message':'Wrong username or password', 'authenticated':False}), 401

@app.route('/api/posts', methods=['GET'])
@jwt_required
def homepage():
    users_array = []
    current_user = get_jwt_identity()
    user = UserProfile.query.filter_by(username=current_user).first()
    follow = Follow.query.filter_by(follower_id=user.id).first()
    users = UserProfile.query.filter(UserProfile.username != current_user).all()
    
    for userw in users:
        check_follow = Follow.query.filter_by(user_id=userw.id, follower_id=user.id).first()
        follows = Follow.query.filter_by(user_id=userw.id).all()
        count = len(follows)
        if check_follow:
            users_array.append(dict({'id':userw.id, 'username':userw.username, 'firstname':userw.first_name, 'lastname':userw.last_name, 'profile_pic':userw.img_address, 'biography':userw.biography, 'location':userw.location, 'check_follow':True, 'follower_count':count, 'created_on':userw.created_on}))
        else:
            users_array.append(dict({'id':userw.id, 'username':userw.username, 'firstname':userw.first_name, 'lastname':userw.last_name, 'profile_pic':userw.img_address, 'biography':userw.biography, 'location':userw.location, 'check_follow':False, 'follower_count':count, 'created_on':userw.created_on}))

    follows = Follow.query.filter_by(user_id=user.id).all()
    count = len(follows)

    if follow:
        return jsonify(user={'id':user.id, 'username':current_user, 'firstname':user.first_name, 'lastname':user.last_name, 'profile_pic':user.img_address, 'biography':user.biography, 'location':user.location, 'follower_count':count, 'created_on':user.created_on}, follow=True, users=users_array), 200
    else:
        return jsonify(user={'id':user.id, 'username':current_user, 'firstname':user.first_name, 'lastname':user.last_name, 'profile_pic':user.img_address, 'biography':user.biography, 'location':user.location, 'follower_count':count, 'created_on':user.created_on}, follow=False, users=users_array), 200

@app.route('/api/users/<int:user_id>/follow', methods=['POST'])
@jwt_required
def follow(user_id):
    current_user = get_jwt_identity()
    follower = UserProfile.query.filter_by(username=current_user).first()
    follower_id = follower.id
    new_follower = Follow(user_id, follower_id)
    db.session.add(new_follower)
    db.session.commit()
    return jsonify({'message':'Following'}), 200

@app.route('/api/users/<int:user_id>/posts', methods=['GET','POST'])
@jwt_required
def post(user_id):
    form = PostForm()
    if request.method == 'POST' and form.validate_on_submit():
        file = request.files['photo']
        filename = secure_filename(file.filename)
        file.save(os.path.join(app.config['UPLOAD_FOLDER'],filename))
        img_address = "/static/uploads/"+filename
        post = Post(user_id, img_address, request.form['caption'])
        db.session.add(post)
        db.session.commit()
        setLikes = Post.query.filter_by(id=post.id).first()
        like = Like(user_id, setLikes.id)
        db.session.add(like)
        db.session.commit()
        return jsonify({'message':'Post added successfully'}), 200
    elif request.method == 'GET':
        posts = []
        follows = Follow.query.filter_by(follower_id=user_id).all()
        user_posts = Post.query.filter_by(user_id=user_id).all()
        user = UserProfile.query.filter_by(id=user_id).first()
        if user_posts is not None:
            for user_post in user_posts:
                likes = Like.query.filter_by(post_id=user_post.id).first()
                if likes is not None:
                    posts.append(dict({'profile_pic':user.img_address, 'username':user.username, 'post_id':user_post.id, 'photo':user_post.photo, 'caption':user_post.caption, 'created_on':user_post.created_on, 'likes':likes.likes}))
                else:
                    posts.append(dict({'profile_pic':user.img_address, 'username':user.username, 'post_id':user_post.id, 'photo':user_post.photo, 'caption':user_post.caption, 'created_on':user_post.created_on, 'likes':0}))
        posts.reverse()
        for follow in follows:
            follows_posts = Post.query.filter_by(user_id=follow.user_id).all()
            user = UserProfile.query.filter_by(id=follow.user_id).first()
            if follows_posts is not None:
                for follow_post in follows_posts:
                    likes = Like.query.filter_by(post_id=follow_post.id).first()
                    if likes is not None:
                        posts.append(dict({'profile_pic':user.img_address, 'username':user.username, 'post_id':follow_post.id, 'photo':follow_post.photo, 'caption':follow_post.caption, 'created_on':follow_post.created_on, 'likes':likes.likes}))
                    else:
                        posts.append(dict({'profile_pic':user.img_address, 'username':user.username, 'post_id':follow_post.id, 'photo':follow_post.photo, 'caption':follow_post.caption, 'created_on':follow_post.created_on, 'likes':0}))
        return jsonify(posts=posts), 200
    return jsonify({'message':'Error'}), 500

@app.route('/api/posts/<int:post_id>/like', methods=['POST'])
@jwt_required
def like(post_id):
    like = Like.query.filter_by(post_id=post_id).first()
    like.likes = like.likes + 1
    db.session.commit()
    return jsonify({'message':'Post liked'}), 200

@app.route('/api/user/edit', methods=['POST'])
@jwt_required
def edit():
    form = UserForm()
    if form.validate_on_submit() and request.method == 'POST':
        user = UserProfile.query.filter_by(username=get_jwt_identity()).first()
        user_id = user.id
        user = UserProfile.query.get(user_id)
        file = request.files['photo']
        if file:
            filename = secure_filename(file.filename)
            file.save(os.path.join(app.config['UPLOAD_FOLDER'],filename))
            img_address = "/static/uploads/"+filename
            user.img_address = img_address
        user.username = request.form['username']
        user.firstname = request.form['firstname']
        user.lastname = request.form['lastname']
        user.biography = request.form['biography']
        user.location = request.form['location']
        db.session.commit()
        return jsonify({'message':'Changed some stuff'}), 200
    return jsonify({'message':'Error'})

@app.route('/api/auth/logout', methods=['GET'])
@jwt_required
def logout():
    return jsonify({'message':'Successfully logged out'}), 200

@login_manager.user_loader
def load_user(id):
    return UserProfile.query.get(int(id))

# Here we define a function to collect form errors from Flask-WTF
# which we can later use
def form_errors(form):
    error_messages = []
    """Collects form errors"""
    for field, errors in form.errors.items():
        for error in errors:
            message = u'Error in the %s field - %s' % (
                    getattr(form, field).label.text,
                    error
                )
            error_messages.append(message)
    return error_messages


###
# The functions below should be applicable to all Flask apps.
###


@app.route('/<file_name>.txt')
def send_text_file(file_name):
    """Send your static text file."""
    file_dot_text = file_name + '.txt'
    return app.send_static_file(file_dot_text)


@app.after_request
def add_header(response):
    """
    Add headers to both force latest IE rendering engine or Chrome Frame,
    and also tell the browser not to cache the rendered page. If we wanted
    to we could change max-age to 600 seconds which would be 10 minutes.
    """
    response.headers['X-UA-Compatible'] = 'IE=Edge,chrome=1'
    response.headers['Cache-Control'] = 'public, max-age=0'
    return response


@app.errorhandler(404)
def page_not_found(error):
    """Custom 404 page."""
    return render_template('404.html'), 404



if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0", port="8080")
