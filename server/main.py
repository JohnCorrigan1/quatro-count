from flask import Flask
from flask_cors import CORS
from templates.users import users
from templates.groups import groups
from templates.expenses import expenses
import os
from supabase import create_client, Client

url: str = os.getenv("SUPABASE_URL")
key: str = os.getenv("SUPABASE_KEY")
supabase: Client = create_client(url, key)

app = Flask(__name__)
app.register_blueprint(users)
app.register_blueprint(groups)
app.register_blueprint(expenses)
# CORS(app, origins=['http://localhost:8081', 'http://localhost:8080', 'http://127.0.0.1:5000'])
CORS(app)


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000, debug=True)
