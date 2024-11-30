import mysql.connector
from flask import Flask, request, jsonify
import requests
from mysql.connector import pooling  # Import connection pooling

# API key và model
API_KEY = "ollama"
MODEL = "gemma2:9b"
API_URL = "http://localhost:11434/v1/completions"  # Thay đổi URL tùy theo API của bạn

# Tạo Flask app
app = Flask(__name__)

# Biến toàn cục để giữ ngữ cảnh cuộc trò chuyện
conversation_context = ""

# Cấu hình connection pool
dbconfig = {
    "host": "localhost",
    "user": "root",
    "password": "sapassword",
    "database": "ecommerce",
    "charset": "utf8mb4",
    "collation": "utf8mb4_general_ci"
}

# Tạo connection pool
db_pool = pooling.MySQLConnectionPool(pool_name="mypool", pool_size=5, **dbconfig)

# Kết nối đến cơ sở dữ liệu sử dụng connection pool
def get_db_connection():
    try:
        return db_pool.get_connection()
    except mysql.connector.Error as err:
        print(f"Error: {err}")
        return None

# Lấy dữ liệu từ bảng product
def fetch_product_data():
    conn = get_db_connection()
    if conn is None:
        return None

    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT id, name, price, description FROM product")  # Truy vấn toàn bộ dữ liệu cần thiết

    products = cursor.fetchall()
    conn.close()
    return products

# Chuyển dữ liệu sản phẩm thành văn bản
def convert_products_to_text(products):
    product_text = "Dữ liệu sản phẩm:\n"
    for product in products:
        product_text += f"ID: {product['id']}\n"
        product_text += f"Tên sản phẩm: {product['name']}\n"
        product_text += f"Giá: {product['price']}\n"
        product_text += f"Mô tả: {product['description']}\n\n"
    return product_text

# Gửi yêu cầu đến API Chatbot của bạn và duy trì ngữ cảnh
def query_chatbot(question, context):
    headers = {
        'Authorization': f'Bearer {API_KEY}',
        'Content-Type': 'application/json'
    }
    payload = {
        "model": MODEL,
        "prompt": context + question,
        "max_tokens": 150
    }
    response = requests.post(API_URL, json=payload, headers=headers)
    if response.status_code == 200:
        result = response.json()
        return result.get("choices", [{}])[0].get("text", "")
    else:
        return "Không thể trả lời câu hỏi vào lúc này."

@app.route("/api/chatbot", methods=["POST"])
def ask():
    global conversation_context
    question = request.json.get("question", "")
    
    # Lấy dữ liệu sản phẩm và chuyển thành văn bản
    products = fetch_product_data()
    if not products:
        return jsonify({"error": "Không thể lấy dữ liệu sản phẩm."}), 500

    product_text = convert_products_to_text(products)

    # Cập nhật ngữ cảnh cuộc trò chuyện
    conversation_context = product_text

    # Gửi câu hỏi đến chatbot và nhận câu trả lời
    answer = query_chatbot(question, conversation_context)
    
    # Cập nhật ngữ cảnh với câu trả lời mới
    conversation_context += f"\nCâu hỏi: {question}\nTrả lời: {answer}"
    
    return jsonify({"answer": answer})

# Chạy app Flask
if __name__ == '__main__':
    app.run(debug=True, port=5001)
