from flask import Flask, request, jsonify
from main import get_recommendations, user_based_recommendation

app = Flask(__name__)

@app.route('/api/recommendations/product/<int:product_id>', methods=['GET'])
def get_recommendation_by_product_id(product_id):
    recommendations = get_recommendations(product_id)
    return jsonify(recommendations.to_dict(orient='records'))

@app.route('/api/recommendations/user/<int:user_id>', methods=['GET'])
def get_recommendation_by_user_id(user_id):
    recommendations = user_based_recommendation(user_id)
    return jsonify(recommendations.to_dict(orient='records'))

if __name__ == '__main__':
    app.run(debug=True)