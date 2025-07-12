import os
import subprocess
import platform
import re

from gtts import gTTS
from pydub import AudioSegment

from elevenlabs import save
from elevenlabs.client import ElevenLabs

# ✅ Initialize ElevenLabs client
ELEVENLABS_API_KEY = "sk_161f4bc426fb081bf48d9719ad280dfc2816896f8a9d10fd"  # Replace with your key
client = ElevenLabs(api_key=ELEVENLABS_API_KEY)


def strip_markdown(text):
    """Remove markdown formatting characters."""
    return re.sub(r'[*_`#>~\-]', '', text)


def convert_mp3_to_wav(mp3_path, wav_path):
    """Convert MP3 to WAV for Windows playback."""
    sound = AudioSegment.from_mp3(mp3_path)
    sound.export(wav_path, format="wav")


def play_audio(output_filepath):
    """Cross-platform audio playback."""
    os_name = platform.system()
    try:
        if os_name == "Darwin":  # macOS
            subprocess.run(['afplay', output_filepath])
        elif os_name == "Windows":
            wav_path = output_filepath.replace('.mp3', '.wav')
            convert_mp3_to_wav(output_filepath, wav_path)
            subprocess.run(['powershell', '-c', f'(New-Object Media.SoundPlayer "{wav_path}").PlaySync();'])
            os.remove(wav_path)
        elif os_name == "Linux":
            subprocess.run(['aplay', output_filepath])
        else:
            raise OSError("Unsupported operating system")
    except Exception as e:
        print(f"🔇 Error playing audio: {e}")


def text_to_speech_with_gtts(input_text, output_filepath):
    """Fallback TTS using gTTS."""
    try:
        input_text = strip_markdown(input_text)
        tts = gTTS(text=input_text, lang="en", slow=False)
        tts.save(output_filepath)
        #play_audio(output_filepath)
        return True
    except Exception as e:
        print(f"🔁 gTTS fallback failed: {e}")
        return False


def text_to_speech_with_elevenlabs(input_text, output_filepath):
    """ElevenLabs TTS for version 2.x"""
    try:
        input_text = strip_markdown(input_text)
        audio = client.generate(
            text=input_text,
            voice="Aria",
            model="eleven_turbo_v2"
        )
        save(audio, output_filepath)
        #play_audio(output_filepath)
        return True
    except Exception as e:
        print(f"⚠️ ElevenLabs error: {e}")
        print("🔁 Falling back to gTTS...")
        return text_to_speech_with_gtts(input_text, output_filepath)


# ✅ Standalone test
if __name__ == "__main__":
    response = "Your symptoms sound like a mild viral infection. Drink plenty of fluids and rest."
    print("🩺 Speaking...")
    text_to_speech_with_elevenlabs(response, "doctor_output.mp3")
