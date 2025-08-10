from flask import Flask
from routes.prediction_routes import prediction_pb

app = Flask(__name__)

app.register_blueprint(prediction_bp)

@app.route("/")
def hello():
    return "Hello World!"

if __name__ == "__main__":
    app.run(debug=True)