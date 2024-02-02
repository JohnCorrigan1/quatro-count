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

users = [
    {
        "id": 1,
        "name": "John",
        "groups": [1, 2]
    },
    {
        "id": 2,
        "name": "Jane",
        "groups": [1, 2]
    },
    {
        "id": 3,
        "name": "Bob",
        "groups": [2]
    },
    {
        "id": 4,
        "name": "Alice",
        "groups": [2]
    }
]

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

groups = [
    {
        "id": 1,
        "name": "Group 1",
        "description": "This is the first group",
        "expenses": expenses,
        "members": [users[0], users[1]]
    },
    {
        "id": 2,
        "name": "Group 2",
        "description": "This is the second group",
        "expenses": [expenses[1]],
        "members": [users[0], users[1], users[2], users[3]]
    }
]

@app.route("/api/hello")
def hello_world():
    return {"message": "Hello, World!"}

# @app.route("/api/users")
# def get_users():
#     return {"users": users}

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
    response = { "name": data[1][0]["username"], "groups": []}
    for i in data[1][0]["groups"]:
        group, _count = supabase.table('groups').select("group_name", "description").eq('id', i).execute()
        response["groups"].append({"id": i, "name": group[1][0]["group_name"], "description": group[1][0]["description"]})
    return response

@app.route("/api/groups", methods=['POST'])
@cross_origin()
def create_group():
    group_name = request.get_json().get('groupName', '')
    group_description = request.get_json().get('groupDescription', '')
    user_id = request.get_json().get('userId', '')
    result, count = supabase.table('groups').insert({"name": group_name, "description": group_description, "members": [user_id]}).execute()



@app.route("/api/users/<user_id>/groups")
def get_user_groups(user_id):
    user = next((user for user in users if user["id"] == user_id), None)
    return {"groups": user["groups"]}

@app.route("/api/groups/<int:group_id>")
def get_group(group_id):
    group = next((group for group in groups if group["id"] == group_id), None)
    return group

@app.route("/api/groups/<group_id>/expenses")
def get_group_expenses(group_id):
    group = next((group for group in groups if group["id"] == group_id), None)
    return {"expenses": group["expenses"]}

@app.route("/api/groups/<group_id>/members")
def get_group_members(group_id):
    group = next((group for group in groups if group["id"] == group_id), None)
    return {"members": group["members"]}

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000, debug=True)
