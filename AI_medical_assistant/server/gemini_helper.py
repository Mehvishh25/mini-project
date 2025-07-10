import os
import google.generativeai as genai

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

def extract_symptoms_from_text(text, all_symptoms):
    try:
        prompt = f"""
You are a medical assistant. Extract relevant symptoms from this user input:
"{text}"
Match the extracted items strictly with this list of symptoms: {all_symptoms}
Return only the matched symptoms from the list, exactly as they appear (case-sensitive), as a Python list.
"""
        model = genai.GenerativeModel("models/gemini-1.5-flash")
        response = model.generate_content(prompt)

        # Print for debugging
        print("Gemini response:", response.text)

        # Extract Python list
        python_code = response.text.strip().split("```")[-2] if "```" in response.text else response.text
        extracted = eval(python_code)

        if isinstance(extracted, list):
            clean = [s.replace("-", "_").lower() for s in extracted]
            return [s for s in clean if s in all_symptoms]


    except Exception as e:
        print("Gemini extraction failed:", e)
    return []
