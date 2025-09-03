# src/backend/routes/prediction_routes.py
from flask import Blueprint, request, jsonify
from services.prediction_service import get_mock_prediction

prediction_bp = Blueprint("prediction", __name__)

@prediction_bp.route("/predict", methods=["POST"])
def predict():
    data = request.get_json()
    prediction = get_mock_prediction(data)
    return jsonify({"prediction": prediction})