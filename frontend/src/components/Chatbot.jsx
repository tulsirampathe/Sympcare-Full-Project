import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { FaPaperPlane, FaTimes, FaWindowMaximize, FaWindowMinimize } from "react-icons/fa";
import Lottie from "lottie-react";
import chatbotAnimation from "../assets/chatbot.json"; // Keep chatbot animation

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "👋 Welcome to *SympCare AI* - Your Healthcare Assistant!" },
    { sender: "bot", text: "How can I help you today? 😊" },
  ]);
  const [input, setInput] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const messagesEndRef = useRef(null);

  const toggleChat = () => setIsOpen(!isOpen);
  const toggleMaximize = () => setIsMaximized(!isMaximized);

  const sendMessage = async (message) => {
    if (!message.trim()) return;
    setMessages((prev) => [...prev, { sender: "user", text: message }]);
    setInput("");
    setIsThinking(true);

    try {
      const response = await fetch("http://127.0.0.1:5000/chats", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });
      const data = await response.json();
      setMessages((prev) => [...prev, { sender: "bot", text: data.response }]);
    } catch (error) {
      setMessages((prev) => [...prev, { sender: "bot", text: "⚠ Error: Unable to reach server!" }]);
    } finally {
      setIsThinking(false);
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isThinking]);

  return (
    <div className={`${isMaximized ? "fixed inset-0 flex justify-center items-center z-50" : "fixed bottom-5 right-5 z-50"}`}>
      {isOpen ? (
        <motion.div className="w-full max-w-lg h-[90vh] max-h-[600px] bg-white shadow-2xl rounded-2xl flex flex-col border border-gray-200">
          {/* Chatbot Header */}
          <div className="bg-primary p-4 flex justify-between items-center rounded-t-2xl">
            <h3 className="text-white text-lg font-bold">SympCare AI Assistant</h3>
            <div className="flex space-x-3">
              <button onClick={toggleMaximize} className="text-white text-xl">
                {isMaximized ? <FaWindowMinimize /> : <FaWindowMaximize />}
              </button>
              <button onClick={toggleChat} className="text-white text-xl">
                <FaTimes />
              </button>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="p-4 h-full overflow-y-auto flex flex-col space-y-3 bg-gray-50">
            {messages.map((msg, index) => (
              <motion.div key={index} className={`max-w-xs p-3 rounded-lg shadow-md ${msg.sender === "bot" ? "bg-primary text-white self-start" : "bg-blue-500 text-white self-end"}`}>
                {msg.text}
              </motion.div>
            ))}

            {/* ✅ Tailwind-based Typing Indicator */}
            {isThinking && (
              <div className="self-start flex space-x-1 p-2">
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.6s]"></span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Reply Buttons */}
          <div className="p-4 border-t bg-white flex items-center space-x-2">
            <button onClick={() => sendMessage("Affirmation")} className="bg-gray-200 px-3 py-1 rounded-lg">
              Affirmation
            </button>
            <button onClick={() => sendMessage("Meditation")} className="bg-gray-200 px-3 py-1 rounded-lg">
              Meditation
            </button>
          </div>

          {/* Input Field */}
          <div className="p-4 border-t bg-white flex items-center space-x-2">
            <input
              type="text"
              className="flex-1 p-2 border rounded-lg outline-none"
              placeholder="Type a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
            />
            <button onClick={() => sendMessage(input)} className="bg-primary text-white px-4 py-2 rounded-lg">
              <FaPaperPlane />
            </button>
          </div>
        </motion.div>
      ) : (
        <motion.button onClick={toggleChat} className="text-white hover:scale-110 transform transition flex items-center">
          <div className="w-28 h-28">
            <Lottie animationData={chatbotAnimation} loop={true} />
          </div>
        </motion.button>
      )}
    </div>
  );
};

export default Chatbot;
