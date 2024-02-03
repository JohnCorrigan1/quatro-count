from flask import Flask, request
from flask_cors import CORS, cross_origin
import os
# load_dotenv()
from supabase import create_client, Client
url: str = os.getenv("SUPABASE_URL")
key: str = os.getenv("SUPABASE_KEY")
supabase: Client = create_client(url, key)

app = Flask(__name__)
CORS(app, origins=['http://localhost:8081', 'http://localhost:8080', 'http://127.0.0.1:5000'])

expenses = [
    {
        "id": 1,
        "name": "Costco",
        "amount": 100,
        "date": "2021-09-01",
        "group_id": 1,
        "paid_by": "John",
        "paid_for": "John, Jane"
    },
    {
        "id": 2,
        "name": "Safeway",
        "amount": 50,
        "date": "2021-09-02",
        "group_id": 1,
        "paid_by": "Jane",
        "paid_for": "John, Jane"
    },
    {
        "id": 3,
        "name": "Target",
        "amount": 75,
        "date": "2021-09-03",
        "group_id": 1,
        "paid_by": "John",
        "paid_for": "John, Jane"
    },
    {
        "id": 4,
        "name": "Walmart",
        "amount": 200,
        "date": "2021-09-04",
        "group_id": 2,
        "paid_by": "John",
        "paid_for": "John, Jane, Bob, Alice"
    },
    {
        "id": 5,
        "name": "Amazon",
        "amount": 300,
        "date": "2021-09-05",
        "group_id": 2,
        "paid_by": "Bob",
        "paid_for": "John, Jane, Bob, Alice"
    }
]

@app.route("/api/users", methods=['POST'] )
@cross_origin()
def create_user():
    username = request.get_json().get('username', '')
    result, count = supabase.table('users').insert({"username": username}).execute()
    print(result)
    return {"message": "User created", "id": result[1][0]['id'], "username": result[1][0]['username']} 

@app.route("/api/users/<int:user_id>")
@cross_origin()
def get_user(user_id):
    data, count = supabase.table('users').select("username, groups").eq('id', user_id).execute()
    response = { "id": user_id, "username": data[1][0]["username"], "groups": []}
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
    response = { "id": group_id, "name": data[1][0]["group_name"], "description": data[1][0]["description"], "members": []}
    for member in data[1][0]["members"]:
        group_member, _count = supabase.table('groupMembers').select('*').eq('user_id', member).eq('group_id', group_id).execute()
        response["members"].append({"groupMemberId": group_member[1][0]['id'], "userId": group_member[1][0]["user_id"], "groupId": group_member[1][0]["group_id"], "username": group_member[1][0]["username"], "currentBalance": group_member[1][0]["current_balance"]})
    return response

@app.route("/api/expenses", methods=['POST'])
@cross_origin()
def create_expense():
    group_id = request.get_json().get('groupId', '')
    expense_name = request.get_json().get('name', '')
    expense_amount = request.get_json().get('amount', '')
    paid_by = request.get_json().get('paidBy', '')
    paid_for = request.get_json().get('paidFor', [])
    description = request.get_json().get('description', '')
    category = request.get_json().get('category', '')
    result, count = supabase.table('expenses').insert({"name": expense_name, "description": description, "amount": expense_amount, "group_id": group_id, "paid_by": paid_by, "paid_for": paid_for, "category": category}).execute()
    return {"message": "Expense created", "id": result[1][0]['id'], "name": result[1][0]['name'], "amount": result[1][0]['amount'], "date": result[1][0]['created_at'], "paid_by": result[1][0]['paid_by'], "paid_for": result[1][0]['paid_for']}

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000, debug=True)
