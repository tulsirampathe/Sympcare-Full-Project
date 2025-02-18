import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import chatbotAnimation from "../assets/chatbot.json";
import {
  FaPaperPlane,
  FaImage,
  FaTimes,
  FaWindowMaximize,
  FaWindowMinimize,
} from "react-icons/fa";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "👋 Welcome to **SympCare AI** - Your Healthcare Assistant!",
    },
    {
      sender: "bot",
      text: "I can assist with symptom analysis, skin disease detection, mental health tips, and more.",
    },
    { sender: "bot", text: "How can I help you today? 😊" },
  ]);
  const [input, setInput] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();

  const toggleChat = () => {setIsOpen(!isOpen)
    setIsMaximized(false)
  };
  const toggleMaximize = () => setIsMaximized(!isMaximized);

  const sendMessage = async (message) => {
    if (!message.trim() && !imageFile) return;
  

    // Send the user text message
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
      // Create FormData to send both image and text message
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
      formData.append("message", message); // Attach the user message as well

      console.log(formData);
      
    //   try {
    //     const response = await fetch("http://127.0.0.1:5000/predict", {
    //       method: "POST",
    //       body: formData,
    //     });
    //     const data = await response.json();

    //     // Show the prediction result in chat with the image
    //     if (response.ok) {
    //       setMessages((prev) => [
    //         ...prev,
    //         {
    //           sender: "bot",
    //           text: `🔬 **Prediction Result:** ${data.prediction}`,
    //           image: URL.createObjectURL(imageFile), // Show the image in the chat
    //         },
    //       ]);
    //     } else {
    //       setMessages((prev) => [
    //         ...prev,
    //         { sender: "bot", text: `⚠️ Error: ${data.error}` },
    //       ]);
    //     }
    //   } catch (error) {
    //     setMessages((prev) => [
    //       ...prev,
    //       {
    //         sender: "bot",
    //         text: "🚨 An error occurred while processing the image.",
    //       },
    //     ]);
    //   }
    // } else {
    //   setMessages((prev) => [
    //     ...prev,
    //     {
    //       sender: "bot",
    //       text: "🤖 Not sure how to respond. Try another query!",
    //     },
    //   ]);
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

  return (
    <div
      className={`${
        isMaximized
          ? "fixed inset-0 flex justify-center items-center z-50"
          : "fixed bottom-5 right-5 z-50"
      }`}
    >
      {isOpen ? (
        <motion.div
          className={`${
            isMaximized
              ? "w-[90%] md:w-[60%] h-[80vh] md:h-[70vh]"
              : "w-full max-w-md h-[500px]"
          } bg-white shadow-2xl rounded-2xl overflow-hidden flex flex-col border border-gray-200`}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {/* Header */}
          <div className="bg-primary p-4 flex justify-between items-center rounded-t-2xl">
            <h3 className="text-white text-lg font-bold">
              SympCare AI Assistant
            </h3>
            <div className="flex space-x-3">
              {/* Hide maximize button on small screens */}
              <button
                onClick={toggleMaximize}
                className="text-white text-xl hover:scale-110 transition hidden md:inline-block"
              >
                {isMaximized ? <FaWindowMinimize /> : <FaWindowMaximize />}
              </button>
              <button
                onClick={toggleChat}
                className="text-white text-xl hover:scale-110 transition"
              >
                <FaTimes />
              </button>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="p-4 h-full overflow-y-auto flex flex-col space-y-3 bg-gray-50">
            {messages.map((msg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: msg.sender === "bot" ? -30 : 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
                className={`max-w-xs p-3 rounded-lg shadow-md ${
                  msg.sender === "bot"
                    ? "bg-primary text-white self-start"
                    : "bg-blue-500 text-white self-end"
                }`}
              >
                {msg.text}

                {/* Display the image if available */}
                {msg.image && (
                  <div className="mt-2">
                    <img
                      src={msg.image}
                      alt="User sent"
                      className="w-48 h-48 object-cover rounded-lg"
                    />
                  </div>
                )}
              </motion.div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Field */}
          <div className="p-4 border-t bg-white flex items-center space-x-2">
            <input
              type="text"
              className="flex-1 p-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Type a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
            />
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files[0])}
              className="hidden"
              id="fileInput"
            />
            <label
              htmlFor="fileInput"
              className="p-2 bg-gray-200 rounded-lg cursor-pointer hover:bg-gray-300"
            >
              <FaImage className="text-gray-600" />
            </label>
            <button
              onClick={() => sendMessage(input)}
              className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
            >
              <FaPaperPlane />
            </button>
          </div>
        </motion.div>
      ) : (
        <motion.button
          onClick={toggleChat}
          className="text-white hover:scale-110 transform transition flex items-center"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="w-28 h-28">
            <Lottie
              animationData={chatbotAnimation}
              loop={true}
              className="w-full h-full"
            />
          </div>
        </motion.button>
      )}
    </div>
  );
};

export default Chatbot;
