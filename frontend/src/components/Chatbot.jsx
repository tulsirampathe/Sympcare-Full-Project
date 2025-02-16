import React, { useState, useRef, useEffect } from "react";
import { assets } from "../assets/assets"; // Ensure you have your assets like chat icon

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "👋 Welcome to SympCare AI Healthcare!" },
    {
      sender: "bot",
      text: "I’m your virtual assistant. I can help with symptom assessment, appointment booking, and more!",
    },
    {
      sender: "bot",
      text: "Type your symptoms, and I'll guide you to the best next step. 💙",
    },
  ]);
  const [input, setInput] = useState("");
  const [showPopup, setShowPopup] = useState(true);
  const messagesEndRef = useRef(null);

  // Toggle open/close chatbot
  const toggleChat = () => {
    setIsOpen((prev) => !prev);
    setShowPopup(false);
  };

  // Function to send a message and simulate a bot reply
  const sendMessage = () => {
    if (!input.trim()) return;
    const newMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, newMessage]);

    setTimeout(() => {
      let botReply =
        "I have noted your request. Can you please provide more details about your symptoms or appointment needs?";
      setMessages((prev) => [...prev, { sender: "bot", text: botReply }]);
    }, 1000);
    setInput("");
  };

  // Handle "Enter" key press in input field
  const handleKeyDown = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  // Auto-scroll to the bottom on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Hide the popup after 7 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(false);
    }, 7000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isOpen ? (
        <div className="w-full max-w-md bg-white shadow-lg rounded-lg overflow-hidden">
          {/* Header */}
          <div className="bg-blue-600 p-4 flex justify-between items-center">
            <h3 className="text-white text-lg font-semibold">
              Sympcare AI Assistant
            </h3>
            <button onClick={toggleChat} className="text-white text-2xl">
              &times;
            </button>
          </div>

          {/* Conversation Area */}
          <div className="p-4 h-64 overflow-y-auto bg-gray-50">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`mb-2 p-2 rounded-lg max-w-xs ${
                  msg.sender === "user"
                    ? "bg-blue-100 self-end text-right ml-auto"
                    : "bg-gray-200 text-left mr-auto"
                }`}
              >
                {msg.text}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="flex border-t p-2">
            <input
              type="text"
              className="flex-grow px-4 py-2 border rounded-l-lg focus:outline-none"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button
              onClick={sendMessage}
              className="bg-blue-600 text-white px-4 py-2 rounded-r-lg hover:bg-blue-700 transition-colors"
            >
              Send
            </button>
          </div>
        </div>
      ) : (
        // Minimized Chat Button with attention message
        <div className="relative">
          {showPopup && (
            <div className="absolute -top-14 -left-24 bg-blue-600 text-white text-sm px-3 py-2 rounded-lg shadow-md animate-bounce">
              💡 Got health concerns? Ask me!
            </div>
          )}
          <button
            onClick={toggleChat}
            className="bg-blue-500 text-white rounded-full p-5 shadow-lg hover:bg-blue-600 transition-transform transform hover:scale-110 w-16 h-16 flex justify-center items-center"
          >
            <img src={assets.chat_icon} alt="Chat" className="w-8 h-8" />
          </button>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
