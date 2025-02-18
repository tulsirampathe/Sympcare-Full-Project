import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Lottie from 'lottie-react';
import chatbotAnimation from "../assets/chatbot.json"; // Ensure correct path
import { FaComments } from "react-icons/fa"; // Importing a message icon

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
  const [popupMessage, setPopupMessage] = useState("Hi! Need assistance? Click Me");
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();

  const toggleChat = () => {
    setIsOpen((prev) => !prev);
    setShowPopup(false);
  };

  const sendMessage = async (message) => {
    if (!message.trim() && !imageFile) return;
  
    setMessages((prev) => [...prev, { sender: "user", text: message }]);
  
    // Handle skin assessment (image upload)
    if (message.toLowerCase().includes("skin assessment")) {
      setImageFile(null);
      navigate("/skin");
      return;
    }
  
    // Handle symptom assessment (text input)
    if (message.toLowerCase().includes("symptom assessment")) {
      setMessages((prev) => [...prev, { sender: "bot", text: "Please provide your symptoms (separate by commas)." }]);
      return;
    }
  
    // Handle mental health assessment
    if (message.toLowerCase().includes("mental health")) {
      setMessages((prev) => [...prev, { sender: "bot", text: "Please answer the following questions regarding your mental health." }]);
      return;
    }
  
    // Handle image upload for skin disease prediction
    if (imageFile) {
      const formData = new FormData();
      formData.append("image", imageFile);
      try {
        const response = await fetch("http://127.0.0.1:5000/skin-predict", {
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
    }
  
    // Handle symptom-based disease prediction
    if (message.toLowerCase().includes("symptom")) {
      const symptoms = message.split(","); // Example: "back pain, fever, etc."
      try {
        const response = await fetch("http://127.0.0.1:5000/symptoms-predict", {
          method: "POST",
          body: new URLSearchParams({ Symptom1: symptoms[0], Symptom2: symptoms[1] }),
        });
        const data = await response.json();
        setMessages((prev) => [...prev, { sender: "bot", text: `Most Accurate Disease: ${data["Most Accurate Disease"]}` }]);
      } catch (error) {
        setMessages((prev) => [...prev, { sender: "bot", text: "An error occurred while predicting." }]);
      }
    }
  
    // Handle mental health prediction
    if (message.toLowerCase().includes("mental health")) {
      const data = {
        age: 25, // Example data
        gender: "Male", // Example data
        employment_status: "Employed", // Example data
        family_history: "No", // Example data
        responses: ["Yes", "No", "Yes", "No", "Yes", "No", "Yes", "Yes", "No", "Yes", "No", "Yes"],
      };
  
      try {
        const response = await fetch("http://127.0.0.1:5000/mental-predict", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        const data = await response.json();
        setMessages((prev) => [...prev, { sender: "bot", text: `Mental Health Prediction: ${data.prediction}` }]);
      } catch (error) {
        setMessages((prev) => [...prev, { sender: "bot", text: "An error occurred while predicting." }]);
      }
    }
  
    setInput("");
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

  // Update popup message every second
  useEffect(() => {
    const interval = setInterval(() => {
      setPopupMessage("Hi! Need assistance? Click Me");
    }, 10000); // Update every second

    return () => clearInterval(interval);
  }, []);

  const lottieOptions = {
    loop: true,
    autoplay: true, 
    animationData: chatbotAnimation, 
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Popup message above chatbot icon */}
      {showPopup && (
        <motion.div
          className="absolute bottom-40 right-4 bg-white shadow-lg p-3 rounded-lg flex items-center space-x-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 30 }}
        >
          <FaComments className="text-gray-500" />
          <p>{popupMessage}</p>
        </motion.div>
      )}

      {isOpen ? (
        <motion.div 
          className="w-full max-w-md bg-white shadow-lg rounded-xl overflow-hidden flex flex-col"
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
        >
          <div className="bg-gradient-to-r from-blue-500 to-blue-700 p-4 flex justify-between items-center rounded-t-xl">
            <h3 className="text-white text-lg font-semibold">SympCare AI Assistant</h3>
            <button onClick={toggleChat} className="text-white text-2xl focus:outline-none">&times;</button>
          </div>

          <div className="p-4 h-80 overflow-y-auto flex flex-col space-y-3">
            {messages.map((msg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.3, duration: 0.3 }}
                className={`mb-2 p-2 rounded-lg max-w-xs ${msg.sender === "bot" ? "bg-gray-200 self-start" : "bg-blue-500 text-white self-end"}`}
              >
                {msg.text}
              </motion.div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-4 border-t flex items-center space-x-3">
            <input
              type="text"
              className="flex-1 p-2 border rounded-lg"
              placeholder="Type a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <input type="file" accept="image/*" onChange={handleImageChange} className="ml-2 p-2 border rounded-lg" />
            <button onClick={() => sendMessage(input)} className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">Send</button>
          </div>
        </motion.div>
      ) : (
        <motion.button
          onClick={toggleChat}
          className="text-white p-6 hover:scale-110 transform transition"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="w-40 h-40">
            <Lottie animationData={chatbotAnimation} loop={true} className="w-full h-full" />
          </div>
        </motion.button>
      )}
    </div>
  );
};

export default Chatbot;
