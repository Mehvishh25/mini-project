from flask import Blueprint, request, jsonify
from werkzeug.utils import secure_filename
import os
from utils.voice_of_patient import transcribe_with_groq
from utils.voice_of_doctor import text_to_speech_with_elevenlabs, text_to_speech_with_gtts
from utils.brain import analyze_image, encode_image

visual_bp = Blueprint("visual", __name__)

@visual_bp.route("/visual-diagnosis", methods=["POST"])
def visual_diagnosis():
    try:
        audio = request.files.get("audio")
        image = request.files.get("image")

        if not audio or not image:
            return jsonify({"error": "Both audio and image are required."}), 400

        os.makedirs("temp", exist_ok=True)
        audio_path = os.path.join("temp", secure_filename(audio.filename))
        image_path = os.path.join("temp", secure_filename(image.filename))
        audio.save(audio_path)
        image.save(image_path)

        # Transcribe voice
        transcript = transcribe_with_groq(
            stt_model="whisper-large-v3",
            audio_filepath=audio_path,
            GROQ_API_KEY=os.getenv("GROQ_API_KEY")
        )

        # Analyze image + voice prompt
        doctor_text = analyze_image(
            query=(
                "You are a doctor. Based on this photo and the patient's voice message, "
                "explain the medical condition briefly. " + transcript
            ),
            model="meta-llama/llama-4-maverick-17b-128e-instruct",
            encoded_img=encode_image(image_path)
        )

        voice_path = os.path.join("temp", "final.mp3")

        try:
            # Try ElevenLabs first
            text_to_speech_with_elevenlabs(input_text=doctor_text, output_filepath=voice_path)
        except Exception as e:
            print(f"ERROR in ElevenLabs TTS: {e}")
            print("⚠️ Falling back to gTTS...")
            try:
                text_to_speech_with_gtts(input_text=doctor_text, output_filepath=voice_path)
            except Exception as fallback_error:
                print(f"ERROR in gTTS fallback: {fallback_error}")
                return jsonify({
                    "transcript": transcript,
                    "doctor_text": doctor_text,
                    "audio_url": None,
                    "error": "Voice synthesis failed"
                }), 200

        return jsonify({
            "transcript": transcript,
            "doctor_text": doctor_text,
            "audio_url": "/static/final.mp3"
        })

    except Exception as e:
        print(f"❌ Unexpected error in /visual-diagnosis: {e}")
        return jsonify({"error": str(e)}), 500
