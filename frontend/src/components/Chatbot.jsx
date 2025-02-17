import React, { useState, useRef, useEffect } from "react";
import { assets } from "../assets/assets";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "👋 Welcome to SympCare AI Healthcare!" },
    { sender: "bot", text: "I’m your virtual assistant. I can help with symptom assessment, appointment booking, and more!" },
    { sender: "bot", text: "Hi! How can I help you?" },
    { sender: "bot", text: "1️⃣ Skin Assessment\n2️⃣ Symptom Assessment\n3️⃣ Appointment\n4️⃣ Mental Health" },
  ]);
  const [input, setInput] = useState("");
  const [showPopup, setShowPopup] = useState(true);
  const [imageFile, setImageFile] = useState(null);
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();

  const toggleChat = () => {
    setIsOpen((prev) => !prev);
    setShowPopup(false);
  };

  const sendMessage = async (message) => {
    if (!message.trim() && !imageFile) return;

    setMessages((prev) => [...prev, { sender: "user", text: message }]);
    setInput("");

    if (message.toLowerCase().includes("skin assessment")) {
      setImageFile(null);
      navigate("/skin");
      return;
    }

    if (imageFile) {
      const formData = new FormData();
      formData.append("image", imageFile);
      try {
        const response = await fetch("http://127.0.0.1:5000/predict", {
          method: "POST",
          body: formData,
        });
        const data = await response.json();
        if (response.ok) {
          setMessages((prev) => [...prev, { sender: "bot", text: `Predicted Disease: ${data.prediction}` }]);
        } else {
          setMessages((prev) => [...prev, { sender: "bot", text: `Error: ${data.error}` }]);
        }
      } catch (error) {
        setMessages((prev) => [...prev, { sender: "bot", text: "An error occurred while predicting." }]);
      }
    } else {
      setMessages((prev) => [...prev, { sender: "bot", text: "Please upload an image for prediction." }]);
    }

    setImageFile(null);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") sendMessage(input);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setMessages((prev) => [...prev, { sender: "user", text: `Image uploaded: ${file.name}` }]);
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const timer = setTimeout(() => setShowPopup(false), 7000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isOpen ? (
        <motion.div 
          className="w-full max-w-md bg-white shadow-xl rounded-xl overflow-hidden flex flex-col"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="bg-gradient-to-r from-blue-500 to-blue-700 p-4 flex justify-between items-center">
            <h3 className="text-white text-lg font-bold">SympCare AI Assistant</h3>
            <button onClick={toggleChat} className="text-white text-2xl">&times;</button>
          </div>
          <div className="p-4 h-64 overflow-y-auto bg-gray-100 space-y-2">
            {messages.map((msg, index) => (
              <div key={index} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.2 }}
                  className={`p-3 text-sm rounded-lg shadow-md max-w-xs ${msg.sender === "user" ? "bg-blue-500 text-white rounded-tr-none" : "bg-gray-300 text-black rounded-tl-none"}`}
                >
                  {msg.text}
                </motion.div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <div className="flex border-t p-2 bg-white">
            <input
              type="text"
              className="flex-grow px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" id="file-upload" />
            <label htmlFor="file-upload" className="cursor-pointer bg-gray-200 px-4 py-2 border border-gray-300">📷</label>
            <button
              onClick={() => sendMessage(input)}
              className="bg-blue-600 text-white px-4 py-2 rounded-r-lg hover:bg-blue-700 transition"
            >
              Send
            </button>
          </div>
        </motion.div>
      ) : (
        <div className="relative">
          {showPopup && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1 }}
              className="absolute -top-14 -left-24 bg-blue-600 text-white text-sm px-3 py-2 rounded-lg shadow-lg"
            >
              💡 Need help? Ask SympCare AI!
            </motion.div>
          )}
          <motion.button
            onClick={toggleChat}
            className="bg-blue-500 text-white rounded-full p-5 shadow-lg w-16 h-16 flex justify-center items-center"
            whileHover={{ scale: 1.1 }}
            animate={{ y: [0, -5, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <img src={assets.chat_icon} alt="Chat" className="w-8 h-8" />
          </motion.button>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
