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
            "members": [user_id]
        }).execute()
   
    add_user_to_group(user_id, result[1][0]['id'], username, current_groups) 
   
    return {
        "message": "Group created",
        "id": result[1][0]['id'],
        "name": result[1][0]['group_name'],
        "description": result[1][0]['description']
        }

def add_user_to_group(user_id, group_id, username, current_groups):
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