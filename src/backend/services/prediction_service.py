def get_mock_prediction(data):
    return {
        "student_name": data.get("name", "Unknown"),
        "predicted_score": 85,
        "performance_category": "Above Average"
    }