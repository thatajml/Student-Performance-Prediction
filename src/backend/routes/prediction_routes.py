from flask import Blueprint, request, jsonify
from services.prediction_service import get_mock_prediction

prediction_bp = Blueprint("prediction_bp", __name__)

@prediction_bp.route("/predict", methods=["POST"])
def predict():
    data = request.get_json()
    result = get_mock_prediction(data)
    return jsonify(result)