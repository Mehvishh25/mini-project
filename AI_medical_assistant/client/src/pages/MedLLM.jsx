import { useState, useRef, useEffect } from "react";
import axios from "axios";

function MedLLM() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { sender: "ai", text: "👋 Hi, I’m your AI doctor. How can I help you today?" },
  ]);
  const chatEndRef = useRef(null);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    try {
      const res = await axios.post("http://127.0.0.1:5000/chatbot/chat", {
        message: input,
      });

      const botMsg = {
        sender: "ai",
        text: res.data.reply || "Sorry, I couldn't understand.",
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { sender: "ai", text: "❌ Something went wrong. Please try again." },
      ]);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col max-w-3xl mx-auto mt-10 px-4">
      <h2 className="text-3xl font-bold text-center text-teal-700 mb-6">
        🧠 MedLLM - AI Medical Chatbot
      </h2>

      <div className="bg-gray-100 rounded-xl p-4 h-[500px] overflow-y-auto shadow-md">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${
              msg.sender === "user" ? "justify-end" : "justify-start"
            } mb-2`}
          >
            <div
              className={`max-w-[70%] px-4 py-2 rounded-lg text-sm whitespace-pre-wrap ${
                msg.sender === "user"
                  ? "bg-blue-600 text-white"
                  : "bg-teal-200 text-black"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      <div className="mt-4 flex flex-col sm:flex-row gap-2">
        <textarea
          rows="2"
          placeholder="Describe your symptoms..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
          className="flex-grow p-3 border border-gray-300 rounded-lg outline-none resize-none"
        />
        <button
          onClick={handleSend}
          className="bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700 transition"
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default MedLLM;
