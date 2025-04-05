from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import os
import fitz  # PyMuPDF
from PIL import Image
from pytesseract import image_to_string
import google.generativeai as genai

app = Flask(__name__, static_folder="../practiceqns", static_url_path="")
CORS(app)

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# Configure Gemini API
genai.configure(api_key="AIzaSyCSWWtiOCrmHvwh5dqHXQKKb3jIabp2kik")
model = genai.GenerativeModel("models/gemini-1.5-pro")

# Extract text from PDF
def extract_text_from_pdf(pdf_path):
    text = ""
    with fitz.open(pdf_path) as doc:
        for page in doc:
            text += page.get_text()
    return text

# Extract text from image
def extract_text_from_image(image_path):
    image = Image.open(image_path)
    return image_to_string(image)

# Generate questions from content
def generate_questions(text):
    prompt = f"""
    Generate 10 easy, 10 medium, and 10 hard-level questions (ONLY QUESTIONS, no answers) from the following study material:

    "{text[:4000]}"

    Format:
    EASY:
    1. Question
    ...
    MEDIUM:
    ...
    HARD:
    ...
    """
    response = model.generate_content(prompt)
    return response.text

# Generate answers from list of questions
def generate_answers_from_questions(questions):
    prompt = "Give concise answers to the following questions:\n\n"
    for level in ["easy", "medium", "hard"]:
        prompt += f"{level.upper()}:\n"
        for q in questions.get(level, []):
            prompt += f"Q: {q}\nA:\n"
    response = model.generate_content(prompt)
    return response.text

@app.route("/")
def serve_main_page():
    return send_from_directory(app.static_folder, "practicequestions.html")

@app.route("/upload", methods=["POST"])
def upload_file():
    file = request.files.get("file")
    if not file:
        return jsonify({"error": "No file uploaded"}), 400

    file_path = os.path.join(UPLOAD_FOLDER, file.filename)
    file.save(file_path)

    ext = file.filename.lower().split(".")[-1]
    if ext == "pdf":
        text = extract_text_from_pdf(file_path)
    elif ext in ["png", "jpg", "jpeg"]:
        text = extract_text_from_image(file_path)
    else:
        return jsonify({"error": "Unsupported file type"}), 400

    questions_text = generate_questions(text)

    questions = {"easy": [], "medium": [], "hard": []}
    current = None
    for line in questions_text.splitlines():
        line = line.strip()
        if line.upper().startswith("EASY"):
            current = "easy"
        elif line.upper().startswith("MEDIUM"):
            current = "medium"
        elif line.upper().startswith("HARD"):
            current = "hard"
        elif line and current:
            if line[0].isdigit() or line.startswith("-"):
                questions[current].append(line)
            else:
                questions[current][-1] += " " + line

    return jsonify(questions)

@app.route("/generate_answers", methods=["POST"])
def generate_answers():
    questions = request.json.get("questions", {})
    if not questions:
        return jsonify({"error": "No questions received"}), 400

    answers = generate_answers_from_questions(questions)
    return jsonify({"answers": answers})

if __name__ == "__main__":
    app.run(debug=True)
