from flask import Blueprint, request, jsonify
from services.prediction_service import predict_student_performance

prediction_bp = Blueprint("prediction_bp", __name__)

@prediction_bp.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.get_json()
        prediction = predict_student_performance(data)
        return jsonify({"prediction": prediction})
    except Exception as e:
        return jsonify({"error": str(e)}), 400