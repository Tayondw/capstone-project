from flask import Blueprint, request, abort
from flask_login import login_required, current_user
from app.models import db, User, Post, Comment, Likes

post_routes = Blueprint("posts", __name__)
