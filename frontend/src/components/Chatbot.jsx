import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { FaPaperPlane, FaTimes, FaWindowMaximize, FaWindowMinimize, FaMicrophone } from "react-icons/fa";
import Lottie from "lottie-react";
import chatbotAnimation from "../assets/chatbot.json"; // Keep chatbot animation
import { useNavigate } from "react-router-dom"; // For page navigation (useNavigate instead of useHistory)

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "👋 Welcome to *SympCare AI* - Your Healthcare Assistant!" },
    { sender: "bot", text: "How can I help you today? 😊" },
  ]);
  const [input, setInput] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [timeoutId, setTimeoutId] = useState(null);
  const messagesEndRef = useRef(null);
  const navigate = useNavigate(); // Using useNavigate for page navigation

  const toggleChat = () => setIsOpen(!isOpen);
  const toggleMaximize = () => setIsMaximized(!isMaximized);

  // Speech Recognition Setup
  const recognition = useRef(null);

  useEffect(() => {
    if (window.SpeechRecognition || window.webkitSpeechRecognition) {
      recognition.current = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
      recognition.current.continuous = true;
      recognition.current.interimResults = true;

      recognition.current.onresult = (event) => {
        const transcript = event.results[event.resultIndex][0].transcript;
        setInput(transcript); // Set the transcribed text into the input field
        clearTimeout(timeoutId); // Clear the previous timeout if there's new input
        const newTimeoutId = setTimeout(() => {
          handleVoiceCommand(transcript); // Handle command after 1 second of silence
        }, 1000); // 1 second timeout
        setTimeoutId(newTimeoutId);
      };

      recognition.current.onend = () => {
        setIsListening(false); // Stop listening after recognition ends
      };
    } else {
      console.log("Speech Recognition API is not supported in this browser.");
    }
  }, [timeoutId]);

  // Handle Voice Commands
  const handleVoiceCommand = (command) => {
    setMessages((prev) => [...prev, { sender: "user", text: command }]);
    setInput("");

    // Basic command handling
    if (command.toLowerCase().includes("home page")) {
      setMessages((prev) => [...prev, { sender: "bot", text: "Navigating to Home..." }]);
      navigate("/home"); // Use useNavigate to navigate
    } else if (command.toLowerCase().includes("appointments")) {
      setMessages((prev) => [...prev, { sender: "bot", text: "Opening Appointment page..." }]);
      navigate("/appointments");
    } else {
      sendMessage(command); // Fallback to normal message sending
    }

    // Stop listening after recognizing the command
    recognition.current.stop();
    setIsListening(false);
  };

  // Send message handler
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
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "⚠ Error: Unable to reach server! Please try again later." },
      ]);
    } finally {
      setIsThinking(false);
    }
  };

  // Start/Stop Listening
  const toggleListening = () => {
    if (isListening) {
      recognition.current.stop(); // Stop listening
    } else {
      recognition.current.start(); // Start listening
    }
    setIsListening(!isListening);
  };

  // Scroll to the latest message
  useEffect(() => {
    if (messagesEndRef.current) {
      const isAtBottom = messagesEndRef.current.getBoundingClientRect().bottom <= window.innerHeight;
      if (isAtBottom) {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [messages, isThinking]);

  // Speech Feedback
  const speakResponse = (text) => {
    const speech = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(speech);
  };

  useEffect(() => {
    if (messages.length > 0 && messages[messages.length - 1].sender === "bot") {
      speakResponse(messages[messages.length - 1].text);
    }
  }, [messages]);

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

            {/* Microphone Button */}
            <button onClick={toggleListening} className="bg-primary text-white px-4 py-2 rounded-lg ml-2">
              <FaMicrophone />
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
