from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv
import os
from routes import register_routes

load_dotenv()

app = Flask(__name__, static_url_path="/static", static_folder="temp")
CORS(app)
register_routes(app)

if __name__ == '__main__':
    app.run(debug=True, port=5000)
