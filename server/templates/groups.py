from flask import request, Blueprint
from flask_cors import cross_origin
import uuid
import app
import helpers

groups = Blueprint('groups', __name__, url_prefix='/api/groups', template_folder='templates')

@groups.route("", methods=['POST'])
@cross_origin()
def create_group():
    group_name = request.get_json().get('name', '')
    group_description = request.get_json().get('description', '')
    user_id = request.get_json().get('userId', '')
    username = request.get_json().get('username', '')
    current_groups = request.get_json().get('currentGroups', [])
    return helpers.create_group(
        group_name,
        group_description,
        user_id,
        username,
        current_groups
    )  

@groups.route("/<int:group_id>")
@cross_origin()
def get_group(group_id):
   return helpers.get_group_data(group_id)
    
@groups.route("/invite", methods=['POST'])
# @cross_origin
def create_invitation_link():
    clerk_id = request.get_json().get('clerk_id', '')
    group_id = request.get_json().get('groupId', '')
    print(clerk_id, group_id)
    base_url = "http://localhost:8081/invite?code="
    invitation_link = base_url + str(uuid.uuid4())
    user_id, _count = app.supabase.table('users').select('id', 'groups').eq('clerk_id', clerk_id).execute()
    invitee_in_group = int(group_id) in user_id[1][0]['groups'] 
    if invitee_in_group == False:
        return {"message": "You are not a member of this group"}
    result, count = app.supabase.table('groupInvitations').insert({"group_id": group_id, "invitation_link": invitation_link, "invited_by_id": user_id[1][0]['id']}).execute()
    print("made it here")
    return {"message": "Invitation link created", "link": invitation_link}

@groups.route("/invite/<string:invitation_link>")
@cross_origin()
def get_invitation_data(invitation_link):
    full_link = "http://localhost:8081/invite?code=" + invitation_link
    data, count = app.supabase.table('groupInvitations').select('*').eq('invitation_link', full_link).execute()
    return {"group_id": data[1][0]['group_id'], "invited_by_id": data[1][0]['invited_by_id']}

@groups.route("/invite/accept", methods=['POST'])
@cross_origin()
def accept_invitation():
    group_id = request.get_json().get('groupId', '')
    user_id = request.get_json().get('userId', '')
    username = request.get_json().get('username', '')
    current_groups = request.get_json().get('currentGroups', [])
    
    groups = list(map(lambda group: group['id'], current_groups))
    helpers.add_user_to_group(user_id, group_id, username, groups)
    
    return {"message": "Invitation accepted"}

@groups.route("/balances", methods=['GET'])
@cross_origin()
def get_group_balances():
    group_id = request.get_json().get('groupId', '')
    return helpers.get_group_members(group_id)

