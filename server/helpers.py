import main

def create_user(username, clerk_id):
    result, count = main.supabase.table('users').insert({"username": username, "clerk_id": clerk_id, "groups": []}).execute()
    return {"message": "User created", "id": result[1][0]['id'], "username": result[1][0]['username']}

def get_user(clerk_id):
    data, count = main.supabase.table('users').select("id, username, groups").eq('clerk_id', clerk_id).execute()
    response = { "id": data[1][0]["id"], "username": data[1][0]["username"], "groups": []}
    for i in data[1][0]["groups"]:
        group, _count = main.supabase.table('groups').select("group_name", "description").eq('id', i).execute()
        response["groups"].append({"id": i, "name": group[1][0]["group_name"], "description": group[1][0]["description"]})
    return response

def create_group(group_name, group_description, user_id, username, current_groups):
    result, count = main.supabase.table('groups').insert({
            "group_name": group_name,
            "description": group_description,
            "members": []
        }).execute()
   
    add_user_to_group(user_id, int(result[1][0]['id']), username, current_groups) 
   
    return {
        "message": "Group created",
        "id": result[1][0]['id'],
        "name": result[1][0]['group_name'],
        "description": result[1][0]['description']
        }

def add_user_to_group(user_id, group_id, username, current_groups):
    group, _count = main.supabase.table('groups').select('members').eq('id', group_id).execute()
    print("groups", group[1][0])
    updated_members = group[1][0]['members']
    updated_members.append(user_id)
    print("updated members", updated_members)
    group_members, _count = main.supabase.table('groups').update({
       "members": updated_members
         }).eq('id', group_id).execute() 
       
    result, count = main.supabase.table('groupMembers').insert({
        "user_id": user_id,
        "group_id": group_id,
        "current_balance": 0.0,
        "username": username
        }).execute()
    
    current_groups.append(group_id)
    
    result, count = main.supabase.table('users').update({
        "groups": current_groups
        }).eq('id', user_id).execute()
    
    return {"message": "Group member created"}

def get_group_data(group_id):
    data, count = main.supabase.table('groups').select(
        "group_name",
        "description",
        "members"
        ).eq('id', group_id).execute()
    
    expenses = get_group_expenses(group_id)
    members = get_group_members(data[1][0]["members"], group_id)
    
    return { 
                "id": group_id,
                "name": data[1][0]["group_name"],
                "description": data[1][0]["description"],
                "members": members,
                "expenses": expenses
                }

def get_group_expenses(group_id):
    expenses, count = main.supabase.table('expenses').select("*").eq('group_id', group_id).execute()
    return expenses[1]

def get_group_members(members, group_id):
    member_data = []
    for member in members:
        group_member, _count = main.supabase.table('groupMembers').select('*').eq(
            'user_id', member).eq('group_id', group_id).execute()
        member_data.append({
            "groupMemberId": group_member[1][0]['id'],
            "userId": group_member[1][0]["user_id"],
            "groupId": group_member[1][0]["group_id"],
            "username": group_member[1][0]["username"],
            "currentBalance": group_member[1][0]["current_balance"]
        })
    return member_data
        