import React, { useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";

const MentalHealthAssessment = () => {
  const [messages, setMessages] = useState([
    { text: "Hello! How are you feeling today? 😊", sender: "bot" },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { text: input, sender: "user" };
    setMessages([...messages, userMessage]);
    setInput("");

    setTimeout(() => {
      const botResponse = getBotResponse(input);
      setMessages((prev) => [...prev, { text: botResponse, sender: "bot" }]);
    }, 1000);
  };

  const getBotResponse = (message) => {
    message = message.toLowerCase();
    if (message.includes("sad") || message.includes("depressed"))
      return "I'm here for you. Try to talk to a friend or take a deep breath. 💙";
    if (message.includes("happy"))
      return "That's great to hear! Keep smiling. 😃";
    if (message.includes("stress") || message.includes("anxious"))
      return "Take a deep breath. Try meditation or a short walk. 🌿";
    return "I understand. Feel free to share more. 💬";
  };

  return (
    <div className="px-6 md:px-12 lg:px-24">
      {/* Section Title */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-800">
          CHAT WITH <span className="text-blue-600">US</span>
        </h2>
        <p className="text-gray-600 mt-2">We're here to support you!</p>
      </div>

      {/* Content Section */}
      <div className="mt-12 flex flex-col md:flex-row items-center gap-12">
        
        {/* Image Section (GIF) */}
        <div className="md:w-1/2 flex justify-center">
          <img
            className="w-full max-w-md rounded-lg shadow-xl hover:scale-105 transition-transform duration-300"
            src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExODdtZzg1c3BqZjZreXZxb3IweHNhaDY0bHAyNDY2d2sxaWFsNnB0ZCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/20NLMBm0BkUOwNljwv/giphy.gif"
            alt="Chatbot GIF"
          />
        </div>

        {/* Chatbox Section */}
        <div className="md:w-1/2 bg-white shadow-lg rounded-lg p-6">
          <h3 className="text-xl font-semibold text-gray-800 text-center">
            Mental <span className="text-primary"> Health Chatbot</span>
          </h3>
          <ScrollToBottom className="h-80 overflow-y-auto border p-3 mt-3 rounded bg-gray-100">
            {messages.map((msg, index) => (
              <div key={index} className={`p-2 ${msg.sender === "user" ? "text-right" : "text-left"}`}>
                <span
                  className={`inline-block p-2 rounded-lg ${
                    msg.sender === "user" ? "bg-blue-500 text-white" : "bg-gray-300 text-black"
                  }`}
                >
                  {msg.text}
                </span>
              </div>
            ))}
          </ScrollToBottom>
          <div className="flex items-center mt-3">
            <input
              type="text"
              className="w-full border p-2 rounded-lg"
              placeholder="Type a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
            />
            <button className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg" onClick={handleSend}>
              Send
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default MentalHealthAssessment;
