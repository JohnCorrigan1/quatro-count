from flask import request, Blueprint
from flask_cors import cross_origin
import os
import app

expenses = Blueprint('expenses', __name__, url_prefix='/api/expenses', template_folder='templates')

@expenses.route("", methods=['POST'])
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
    result, count = app.supabase.table('expenses').insert({"title": expense_name, "description": description, "amount": expense_amount, "group_id": group_id, "paid_by": paid_by, "paid_for": paid_for, "category": category}).execute()
    print(expense_amount)
    amount = float(expense_amount)
    amountPerPerson = amount/len(paid_for)
    if paid_by not in paid_for:
        group_member, _count = app.supabase.table('groupMembers').select('*').eq('id', paid_by).eq('group_id', group_id).execute()
        result, _count = app.supabase.table('groupMembers').update({"current_balance": group_member[1][0]['current_balance'] + amount}).eq('id', group_member[1][0]['id']).execute()

    for member in paid_for:
        group_member, _count = app.supabase.table('groupMembers').select('*').eq('id', member).eq('group_id', group_id).execute()
        if member == paid_by:
            result, _count = app.supabase.table('groupMembers').update({"current_balance": group_member[1][0]['current_balance'] + (amount - amountPerPerson)}).eq('id', group_member[1][0]['id']).execute()
        else:
            result, _count = app.supabase.table('groupMembers').update({"current_balance": group_member[1][0]['current_balance'] - (expense_amount/len(paid_for))}).eq('id', group_member[1][0]['id']).execute()

    # return {"message": "Expense created", "id": result[1][0]['id'], "title": result[1][0]['title'], "amount": result[1][0]['amount'], "date": result[1][0]['created_at'], "paid_by": result[1][0]['paid_by'], "paid_for": result[1][0]['paid_for']}
    return {"message": "Expense created"}
