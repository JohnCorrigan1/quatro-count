from flask import request, Blueprint
from flask_cors import cross_origin
import uuid
import main
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
    data, count = main.supabase.table('groups').select("group_name", "description", "members").eq('id', group_id).execute()
    expenses, count = main.supabase.table('expenses').select("*").eq('group_id', group_id).execute()
    response = { "id": group_id, "name": data[1][0]["group_name"], "description": data[1][0]["description"], "members": [], "expenses": expenses[1]}
    for member in data[1][0]["members"]:
        group_member, _count = main.supabase.table('groupMembers').select('*').eq('user_id', member).eq('group_id', group_id).execute()
        response["members"].append({"groupMemberId": group_member[1][0]['id'], "userId": group_member[1][0]["user_id"], "groupId": group_member[1][0]["group_id"], "username": group_member[1][0]["username"], "currentBalance": group_member[1][0]["current_balance"]})
    return response

@groups.route("/invite", methods=['POST'])
# @cross_origin
def create_invitation_link():
    clerk_id = request.get_json().get('clerk_id', '')
    group_id = request.get_json().get('groupId', '')
    print(clerk_id, group_id)
    base_url = "http://localhost:8081/invite?code="
    invitation_link = base_url + str(uuid.uuid4())
    user_id, _count = main.supabase.table('users').select('id', 'groups').eq('clerk_id', clerk_id).execute()
    invitee_in_group = int(group_id) in user_id[1][0]['groups'] 
    if invitee_in_group == False:
        return {"message": "You are not a member of this group"}
    result, count = main.supabase.table('groupInvitations').insert({"group_id": group_id, "invitation_link": invitation_link, "invited_by_id": user_id[1][0]['id']}).execute()
    print("made it here")
    return {"message": "Invitation link created", "link": invitation_link}

@groups.route("/invite/<string:invitation_link>")
@cross_origin()
def get_invitation_data(invitation_link):
    full_link = "http://localhost:8081/invite?code=" + invitation_link
    data, count = main.supabase.table('groupInvitations').select('*').eq('invitation_link', full_link).execute()
    return {"group_id": data[1][0]['group_id'], "invited_by_id": data[1][0]['invited_by_id']}

@groups.route("/invite/accept", methods=['POST'])
@cross_origin()
def accept_invitation():
    group_id = request.get_json().get('groupId', '')
    user_id = request.get_json().get('userId', '')
    username = request.get_json().get('username', '')
    current_groups = request.get_json().get('currentGroups', [])
    # current_groups, count = supabase.table('users').select('groups').eq('id', user_id).execute()
    group_member, count = main.supabase.table('groupMembers').insert({"user_id": user_id, "group_id": group_id, "current_balance": 0.0, "username": username}).execute()
    current_groups.append(group_id)
    result, count = main.supabase.table('users').update({"groups": current_groups}).eq('id', user_id).execute()
    # result, count = supabase.table('groups').update({"members": current_groups}).eq('id', group_id).execute()
    return {"message": "Invitation accepted"}
