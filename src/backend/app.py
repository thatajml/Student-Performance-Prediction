# src/backend/app.py
from flask import Flask
from routes.prediction_routes import prediction_bp

app = Flask(__name__)
app.register_blueprint(prediction_bp)  # This activates the /predict route

@app.route("/")
def home():
    return "Hello World"

if __name__ == "__main__":
    app.run(debug=True)