import { useState, useRef } from "react";
import axios from "axios";

function ChatWithDoctor() {
  const [image, setImage] = useState(null);
  const [audioBlob, setAudioBlob] = useState(null);
  const [result, setResult] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [loading, setLoading] = useState(false);

  const mediaRecorderRef = useRef(null);
  const audioChunks = useRef([]);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorderRef.current = new MediaRecorder(stream);
    audioChunks.current = [];

    mediaRecorderRef.current.ondataavailable = (event) => {
      audioChunks.current.push(event.data);
    };

    mediaRecorderRef.current.onstop = () => {
      const audio = new Blob(audioChunks.current, { type: "audio/wav" });
      setAudioBlob(audio);
    };

    mediaRecorderRef.current.start();
    setIsRecording(true);
  };

  const stopRecording = () => {
    mediaRecorderRef.current.stop();
    setIsRecording(false);
  };

  const handleSubmit = async () => {
    if (!audioBlob || !image) return alert("Please provide both audio and image.");

    const formData = new FormData();
    formData.append("audio", audioBlob, "patient_audio.wav");
    formData.append("image", image);

    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/api/visual-diagnosis", formData);
      setResult(res.data);
    } catch (err) {
      console.error(err);
      alert("Error occurred! Check server logs.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 px-4">
      <h1 className="text-3xl font-bold text-teal-700 mb-6 text-center">
        🩺 Visual Diagnosis Assistant
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white rounded-xl p-6 shadow-md">
        {/* Audio Section */}
        <div>
          <label className="block font-medium mb-2 text-teal-800">🎤 Record Patient's Voice</label>
          {isRecording ? (
            <button
              onClick={stopRecording}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Stop Recording
            </button>
          ) : (
            <button
              onClick={startRecording}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Start Recording
            </button>
          )}
          {audioBlob && <p className="text-green-700 mt-2 text-sm">✅ Audio Recorded</p>}
        </div>

        {/* Image Upload Section */}
        <div>
          <label className="block font-medium mb-2 text-teal-800">
            📸 Upload Image of Affected Area
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            className="block w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>
      </div>

      <div className="flex justify-center mt-6">
        <button
          onClick={handleSubmit}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          {loading ? "Processing..." : "Submit for Diagnosis"}
        </button>
      </div>

      {result && (
        <div className="bg-gradient-to-br from-blue-900 via-teal-600 to-blue-900 rounded-xl p-6 text-white mt-8 shadow-lg">
          <h2 className="text-xl font-semibold mb-2">🗣️ Transcript</h2>
          <p className="mb-4 whitespace-pre-wrap">{result.transcript}</p>

          <h2 className="text-xl font-semibold mb-2">👨‍⚕️ Doctor's Response</h2>
          <p className="mb-4 whitespace-pre-wrap">{result.doctor_text}</p>

          <h2 className="text-xl font-semibold mb-2">🔊 Voice Output</h2>
          <audio controls src={`http://localhost:5000${result.audio_url}`} className="mt-2" />
        </div>
      )}
    </div>
  );
}

export default ChatWithDoctor;
  