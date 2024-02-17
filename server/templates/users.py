# from app import app, supabase
import app
from flask_cors import cross_origin
from flask import request, Blueprint
import helpers

users = Blueprint('users', __name__, url_prefix='/api/users', template_folder='templates')

@users.route('', methods=['POST'])
@cross_origin()
def create_user():
    username = request.get_json().get('username', '')
    clerk_id = request.get_json().get('clerk_id', '')
    return helpers.create_user(username, clerk_id)

@users.route('/<string:clerk_id>', methods=['GET'])
@cross_origin()
def get_user(clerk_id):
   return helpers.get_user(clerk_id) 

