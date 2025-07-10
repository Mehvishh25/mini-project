from flask import Blueprint, request, jsonify
import google.generativeai as genai

medchatbot_bp = Blueprint("medchatbot", __name__)

# Gemini API key config
genai.configure(api_key="AIzaSyBb0yOnYLBoicKe8SEajKCeMxqqAzneyzI")

# Start Gemini chat session with no `system` or `context`
model = genai.GenerativeModel("gemini-1.5-flash")
chat_session = model.start_chat()

# First message flag
first_message = True

@medchatbot_bp.route("/chat", methods=["POST"])
def chat():
    global first_message

    try:
        data = request.get_json()
        user_input = data.get("message", "")

        # Prepend instruction to the very first message
        if first_message:
            user_input = (
                "You are an experienced, ethical AI medical assistant. "
                "Do not refer to yourself as 'Doctor'. "
                "Avoid greetings. Ask follow-up questions when needed. "
                "Be clear and concise.\n\nPatient: " + user_input
            )
            first_message = False

        # Send the message to Gemini
        response = chat_session.send_message(user_input)
        reply = response.text.strip()

        return jsonify({"reply": reply})

    except Exception as e:
        print("🚨 Gemini Error:", str(e))
        return jsonify({"reply": f"❌ Gemini error: {str(e)}"}), 500
