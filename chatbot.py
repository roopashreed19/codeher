from flask import Flask, request, jsonify, send_from_directory
import google.generativeai as genai
from dotenv import load_dotenv
import os
import logging
from flask_cors import CORS


load_dotenv()
api_key = os.getenv("GEMINI_API_KEY")


logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)


app = Flask(__name__, static_url_path='', static_folder='.', template_folder='.')
CORS(app)


genai.configure(api_key=api_key)
model = genai.GenerativeModel("gemini-1.5-flash")


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

@app.route('/')
def home():
    return send_from_directory('.', 'chatbot.html')

@app.route('/ask', methods=['POST'])
def ask():
    data = request.get_json()
    prompt = data.get('question')
    if not prompt:
        return jsonify({'error': 'Question is missing'}), 400
    response = process_prompt(prompt)
    return jsonify({'answer': response})

@app.route('/<path:filename>')
def serve_static(filename):
    return send_from_directory('.', filename)

if __name__ == '__main__':
    app.run(debug=True,port=5001)
