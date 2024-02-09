from flask import Flask, request
from flask_cors import CORS, cross_origin
import os
import uuid
# load_dotenv()
from supabase import create_client, Client
url: str = os.getenv("SUPABASE_URL")
key: str = os.getenv("SUPABASE_KEY")
supabase: Client = create_client(url, key)

app = Flask(__name__)
# CORS(app, origins=['http://localhost:8081', 'http://localhost:8080', 'http://127.0.0.1:5000'])
CORS(app)

@app.route("/api/users", methods=['POST'] )
@cross_origin()
def create_user():
    username = request.get_json().get('username', '')
    clerk_id = request.get_json().get('clerk_id', '')
    result, count = supabase.table('users').insert({"username": username, "clerk_id": clerk_id, "groups": []}).execute()
    return {"message": "User created", "id": result[1][0]['id'], "username": result[1][0]['username']} 

@app.route("/api/users/<string:clerk_id>")
@cross_origin()
def get_user(clerk_id):
    data, count = supabase.table('users').select("id, username, groups").eq('clerk_id', clerk_id).execute()
    response = { "id": data[1][0]["id"], "username": data[1][0]["username"], "groups": []}
    for i in data[1][0]["groups"]:
        group, _count = supabase.table('groups').select("group_name", "description").eq('id', i).execute()
        response["groups"].append({"id": i, "name": group[1][0]["group_name"], "description": group[1][0]["description"]})
    return response

@app.route("/api/groups", methods=['POST'])
@cross_origin()
def create_group():
    group_name = request.get_json().get('name', '')
    group_description = request.get_json().get('description', '')
    user_id = request.get_json().get('userId', '')
    username = request.get_json().get('username', '')
    current_groups = request.get_json().get('currentGroups', [])
    result, count = supabase.table('groups').insert({"group_name": group_name, "description": group_description, "members": [user_id]}).execute()
    current_groups.append(result[1][0]['id'])
    group_member, count = supabase.table('groupMembers').insert({"user_id": user_id, "group_id": result[1][0]['id'], "current_balance": 0.0, "username": username}).execute()
    result_again, count = supabase.table('users').update({"groups": current_groups}).eq('id', user_id).execute()
    return {"message": "Group created", "id": result[1][0]['id'], "name": result[1][0]['group_name'], "description": result[1][0]['description']}

@app.route("/api/groups/<int:group_id>")
@cross_origin()
def get_group(group_id):
    data, count = supabase.table('groups').select("group_name", "description", "members").eq('id', group_id).execute()
    expenses, count = supabase.table('expenses').select("*").eq('group_id', group_id).execute()
    response = { "id": group_id, "name": data[1][0]["group_name"], "description": data[1][0]["description"], "members": [], "expenses": expenses[1]}
    for member in data[1][0]["members"]:
        group_member, _count = supabase.table('groupMembers').select('*').eq('user_id', member).eq('group_id', group_id).execute()
        response["members"].append({"groupMemberId": group_member[1][0]['id'], "userId": group_member[1][0]["user_id"], "groupId": group_member[1][0]["group_id"], "username": group_member[1][0]["username"], "currentBalance": group_member[1][0]["current_balance"]})
    return response

@app.route("/api/expenses", methods=['POST'])
@cross_origin()
def create_expense():
    group_id = request.get_json().get('groupId', '')
    expense_name = request.get_json().get('title', '')
    print(expense_name)
    expense_amount = request.get_json().get('amount', '')
    paid_by = request.get_json().get('paidBy', '')
    paid_for = request.get_json().get('paidFor', [])
    description = request.get_json().get('description', '')
    category = request.get_json().get('category', '')
    result, count = supabase.table('expenses').insert({"title": expense_name, "description": description, "amount": expense_amount, "group_id": group_id, "paid_by": paid_by, "paid_for": paid_for, "category": category}).execute()
    print(expense_amount)
    amount = float(expense_amount)
    amountPerPerson = amount/len(paid_for)
    if paid_by not in paid_for:
        group_member, _count = supabase.table('groupMembers').select('*').eq('id', paid_by).eq('group_id', group_id).execute()
        result, _count = supabase.table('groupMembers').update({"current_balance": group_member[1][0]['current_balance'] + amount}).eq('id', group_member[1][0]['id']).execute()

    for member in paid_for:
        group_member, _count = supabase.table('groupMembers').select('*').eq('id', member).eq('group_id', group_id).execute()
        if member == paid_by:
            result, _count = supabase.table('groupMembers').update({"current_balance": group_member[1][0]['current_balance'] + (amount - amountPerPerson)}).eq('id', group_member[1][0]['id']).execute()
        else:
            result, _count = supabase.table('groupMembers').update({"current_balance": group_member[1][0]['current_balance'] - (expense_amount/len(paid_for))}).eq('id', group_member[1][0]['id']).execute()

    # return {"message": "Expense created", "id": result[1][0]['id'], "title": result[1][0]['title'], "amount": result[1][0]['amount'], "date": result[1][0]['created_at'], "paid_by": result[1][0]['paid_by'], "paid_for": result[1][0]['paid_for']}
    return {"message": "Expense created"}

@app.route("/api/groups/invite", methods=['POST'])
# @cross_origin
def create_invitation_link():
    clerk_id = request.get_json().get('clerk_id', '')
    group_id = request.get_json().get('groupId', '')
    print(clerk_id, group_id)
    base_url = "http://localhost:8081/invite?code="
    invitation_link = base_url + str(uuid.uuid4())
    user_id, _count = supabase.table('users').select('id', 'groups').eq('clerk_id', clerk_id).execute()
    invitee_in_group = int(group_id) in user_id[1][0]['groups'] 
    if invitee_in_group == False:
        return {"message": "You are not a member of this group"}
    result, count = supabase.table('groupInvitations').insert({"group_id": group_id, "invitation_link": invitation_link, "invited_by_id": user_id[1][0]['id']}).execute()
    print("made it here")
    return {"message": "Invitation link created", "link": invitation_link}

@app.route("/api/groups/invite/<string:invitation_link>")
@cross_origin()
def get_invitation_data(invitation_link):
    full_link = "http://localhost:8081/invite?code=" + invitation_link
    data, count = supabase.table('groupInvitations').select('*').eq('invitation_link', full_link).execute()
    return {"group_id": data[1][0]['group_id'], "invited_by_id": data[1][0]['invited_by_id']}

@app.route("/api/groups/invite/accept", methods=['POST'])
@cross_origin()
def accept_invitation():
    group_id = request.get_json().get('groupId', '')
    user_id = request.get_json().get('userId', '')
    username = request.get_json().get('username', '')
    current_groups = request.get_json().get('currentGroups', [])
    # current_groups, count = supabase.table('users').select('groups').eq('id', user_id).execute()
    group_member, count = supabase.table('groupMembers').insert({"user_id": user_id, "group_id": group_id, "current_balance": 0.0, "username": username}).execute()
    current_groups.append(group_id)
    result, count = supabase.table('users').update({"groups": current_groups}).eq('id', user_id).execute()
    result, count = supabase.table('groups').update({"members": current_groups}).eq('id', group_id).execute()
    return {"message": "Invitation accepted"}

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000, debug=True)
