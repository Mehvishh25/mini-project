from flask import Blueprint, request, jsonify
import os
import fitz  # PyMuPDF
import pytesseract
from pdf2image import convert_from_bytes
import google.generativeai as genai

lab_report_bp = Blueprint("lab_report", __name__)

# Google Gemini setup
GOOGLE_API_KEY = ""
os.environ["GOOGLE_API_KEY"] = GOOGLE_API_KEY
model = genai.GenerativeModel("gemini-1.5-flash")

INSIGHT_PROMPT = """
You are a skilled medical expert and health advisor. Analyze the following lab report content and provide structured output in markdown:

### 1. Key Medical Findings
- Identify any abnormal values.
- Describe critical markers (e.g., glucose, hemoglobin, WBCs, cholesterol).

### 2. Health Insights
- Assess what the lab results indicate (e.g., possible conditions, risk factors).
- Use layman-friendly explanations.

### 3. Recommended Actions
- Suggest follow-ups, lifestyle tips, or when to consult a doctor.

### 4. Diet & Lifestyle Advice
- Provide relevant tips based on findings (e.g., for anemia, diabetes, high cholesterol).

Be concise, structured, and accurate. Only include health-related insights.
"""

# ✅ Helper: Extract text from text-based PDF
def extract_text_pdf(pdf_bytes):
    text = ""
    doc = fitz.open(stream=pdf_bytes, filetype="pdf")
    for page in doc:
        text += page.get_text()
    return text.strip()

# ✅ Helper: Extract text from image-based PDF using OCR
def extract_ocr_pdf(pdf_bytes):
    images = convert_from_bytes(pdf_bytes)
    text = ""
    for img in images:
        gray = img.convert("L")
        text += pytesseract.image_to_string(gray)
    return text.strip()

# ✅ Route: POST /lab/analyze
@lab_report_bp.route("/analyze", methods=["POST"])
def analyze_lab_report():
    if "file" not in request.files:
        return jsonify({"response": "No file uploaded."}), 400

    file = request.files["file"]
    pdf_bytes = file.read()
    text = extract_text_pdf(pdf_bytes)

    if not text or len(text.strip()) < 50:
        text = extract_ocr_pdf(pdf_bytes)

    if not text or len(text.strip()) < 50:
        return jsonify({"response": "Could not extract meaningful content from the lab report."}), 400

    try:
        response = model.generate_content(f"{INSIGHT_PROMPT}\n\n{text}")
        return jsonify({"response": response.text})
    except Exception as e:
        return jsonify({"response": f"Error during analysis: {e}"}), 500
