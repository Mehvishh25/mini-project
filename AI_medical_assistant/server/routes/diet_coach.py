from flask import Blueprint, request, jsonify
import os
import google.generativeai as genai

# Correct blueprint name to match __init__.py
diet_coach_bp = Blueprint("diet_coach", __name__)

# ✅ Gemini API setup
GOOGLE_API_KEY = ""  # Replace with your actual API key
os.environ["GOOGLE_API_KEY"] = GOOGLE_API_KEY
genai.configure(api_key=GOOGLE_API_KEY)
model = genai.GenerativeModel("gemini-1.5-flash")

# ✅ Prompt Template
PROMPT_TEMPLATE = """
You are a certified dietician.

Generate a 1-day personalized diet plan based on:
- Age: {age}
- Height: {height} cm
- Weight: {weight} kg
- Gender: {gender}
- Lifestyle: {lifestyle}
- Goal: {goal}
- Diseases: {diseases}
- Allergies: {allergies}
- Meal Preference: {meal_pref}
- Cuisine Preference: {cuisine}

Return the plan in plain text using these headings:

Breakfast:
Mid-Morning Snack:
Lunch:
Evening Snack:
Dinner:
Hydration:
Lifestyle Tips:
Disclaimer:

Use clear formatting with no markdown or HTML. Do not include extra empty lines or decoration.
"""



# ✅ API Endpoint
@diet_coach_bp.route("/plan", methods=["POST"])
def generate_diet_plan():
    try:
        data = request.get_json()

        prompt = PROMPT_TEMPLATE.format(
            age=data["age"],
            height=data["height"],
            weight=data["weight"],
            gender=data["gender"],
            lifestyle=data["lifestyle"],
            goal=data["goal"],
            diseases=data.get("diseases", "None"),
            allergies=data.get("allergies", "None"),
            meal_pref=data.get("meal_pref", "None"),
            cuisine=data.get("cuisine", "None")
        )

        response = model.generate_content(prompt)
        return jsonify({"response": response.text})

    except Exception as e:
        return jsonify({"error": str(e)}), 500
