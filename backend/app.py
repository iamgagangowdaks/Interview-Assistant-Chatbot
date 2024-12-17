# backend/app.py
from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from dotenv import load_dotenv
import google.generativeai as genai

# Load environment variables
load_dotenv()

# Configure Gemini API
genai.configure(api_key="AIzaSyCn7P9SoW4LkhAn4aFJlIttzu9WXkdCuzY")

app = Flask(__name__)
CORS(app)

# Initialize model
model = genai.GenerativeModel("gemini-1.5-flash")

def get_gemeni_response(question):
    response = model.generate_content(question)
    parts = response.candidates[0].content.parts
    return ' '.join(part.text for part in parts)

# Define a POST route for handling frontend requests
@app.route("/generate", methods=["POST"])
def generate():
    data = request.get_json()
    question = data.get("question")
    if not question:
        return jsonify({"error": "Question is required!"}), 400

    response = get_gemeni_response(question)
    return jsonify({"response": response})

if __name__ == "__main__":
    app.run(debug=True, port=5000)

