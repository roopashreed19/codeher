from flask import Flask, request, jsonify
import google.generativeai as genai
from dotenv import load_dotenv
import os
import logging
from flask_cors import CORS

# Load .env file
load_dotenv()
print("Loaded API Key:", os.getenv("GEMINI_API_KEY"))

logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

app = Flask(__name__)
CORS(app)


# Configure Gemini
api_key = os.getenv("GEMINI_API_KEY")
genai.configure(api_key=api_key)
model = genai.GenerativeModel("gemini-1.5-flash")

# EduGenius Doubt Context
doubt_solving_context = '''
You are a doubt-solving assistant for EduGenius, a competitive exam prep platform.
Answer academic questions clearly, in simple words.
Avoid hallucination or special formatting.
'''

def process_prompt(prompt: str):
    full_prompt = doubt_solving_context + "\n\n" + prompt
    try:
        response = model.generate_content(full_prompt)
        return response.text
    except Exception as e:
        logger.error(f"Error generating content: {e}")
        return f"Try Again: {e}"

@app.route('/ask', methods=['POST'])
def ask():
    data = request.get_json()
    prompt = data.get('question')
    if not prompt:
        return jsonify({'error': 'Question is missing'}), 400
    response = process_prompt(prompt)
    return jsonify({'answer': response})

if __name__ == '__main__':
    app.run(debug=True)
