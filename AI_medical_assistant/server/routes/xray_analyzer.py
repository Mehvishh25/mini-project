import os
from flask import request, jsonify, Blueprint
from PIL import Image as PILImage
from agno.agent import Agent
from agno.models.google import Gemini
from agno.media import Image as AgnoImage

xray_analyzer_bp = Blueprint("xray_analyzer", __name__)

GOOGLE_API_KEY = ""
os.environ["GOOGLE_API_KEY"] = GOOGLE_API_KEY

if not GOOGLE_API_KEY:
    raise ValueError("⚠️ Please set your Google API Key in GOOGLE_API_KEY")

medical_agent = Agent(
    model=Gemini(id="gemini-2.0-flash-exp"),
    markdown=True
)

query = """
You are a highly skilled medical imaging expert with extensive knowledge in radiology and diagnostic imaging.

Provide a direct, structured markdown response without any introductory or conversational text like "Okay, I will analyze..." or greetings. Only return the following structured format:

### 1. Image Type & Region
- Identify imaging modality (X-ray/MRI/CT/Ultrasound/etc.).
- Specify anatomical region and positioning.
- Evaluate image quality and technical adequacy.

### 2. Key Findings
- Highlight primary observations systematically.
- Identify potential abnormalities with detailed descriptions.
- Include measurements and densities where relevant.

### 3. Diagnostic Assessment
- Provide primary diagnosis with confidence level.
- List differential diagnoses ranked by likelihood.
- Support each diagnosis with observed evidence.
- Highlight critical/urgent findings.

### 4. Patient-Friendly Explanation
- Simplify findings in clear, non-technical language.
- Avoid medical jargon or provide easy definitions.
- Include relatable visual analogies.

Strictly follow this format without adding any other sentences. Only return content in this format.
"""

@xray_analyzer_bp.route("/analyze", methods=["POST"])
def analyze_xray():
    if "file" not in request.files:
        return jsonify({"response": "No image file provided."}), 400

    file = request.files["file"]
    filename = "uploaded_xray.png"
    file.save(filename)

    try:
        image = PILImage.open(filename)
        width, height = image.size
        new_width = 500
        new_height = int(new_width / (width / height))
        resized_image = image.resize((new_width, new_height))
        temp_path = "resized_xray.png"
        resized_image.save(temp_path)

        agno_image = AgnoImage(filepath=temp_path)
        response = medical_agent.run(query, images=[agno_image])
        return jsonify({"response": response.content})

    except Exception as e:
        return jsonify({"response": f"Error analyzing image: {str(e)}"})

    finally:
        if os.path.exists(filename):
            os.remove(filename)
        if os.path.exists(temp_path):
            os.remove(temp_path)
