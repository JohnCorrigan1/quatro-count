from flask import Flask
from flask_cors import CORS

app = Flask(__name__)

CORS(app)

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
        "expenses": expenses[0],
        "members": [users[0], users[1]]
    },
    {
        "id": 2,
        "name": "Group 2",
        "description": "This is the second group",
        "expenses": expenses[1],
        "members": [users[0], users[1], users[2], users[3]]
    }
]

@app.route("/api/hello")
def hello_world():
    return {"message": "Hello, World!"}

@app.route("/api/users")
def get_users():
    return {"users": users}

@app.route("/api/users/<user_id>")
def get_user(user_id):
    user = next((user for user in users if user["id"] == user_id), None)
    if user is None:
        return {"message": "User not found"}, 404
    usermetadata = {
        "name": user["name"],
        "groups": []
    }
    #get groups for user
    for group in groups:
        if user_id in [member["id"] for member in group["members"]]:
            usermetadata["groups"].append({"id": group["id"], "name": group["name"], "description": group["description"]})

    return usermetadata

@app.route("/api/users/<user_id>/groups")
def get_user_groups(user_id):
    user = next((user for user in users if user["id"] == user_id), None)
    return {"groups": user["groups"]}

@app.route("/api/groups/<group_id>")
def get_group(group_id):
    group = next((group for group in groups if group["id"] == group_id), None)
    return {"group": group}

@app.route("/api/groups/<group_id>/expenses")
def get_group_expenses(group_id):
    group = next((group for group in groups if group["id"] == group_id), None)
    return {"expenses": group["expenses"]}

@app.route("/api/groups/<group_id>/members")
def get_group_members(group_id):
    group = next((group for group in groups if group["id"] == group_id), None)
    return {"members": group["members"]}



if __name__ == "__main__":
    app.run(debug=True) 