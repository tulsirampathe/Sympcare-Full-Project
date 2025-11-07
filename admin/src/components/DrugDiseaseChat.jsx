/* eslint-disable react/prop-types */
import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import {
  FaPaperPlane,
  FaTimes,
  FaWindowMaximize,
  FaWindowMinimize,
  FaMicrophone,
  FaMicrophoneSlash,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

// Chatbot Button Component
const ChatbotButton = ({ isOpen, toggleChat }) => {
  return (
    <motion.button
      onClick={toggleChat}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.97 }}
      className={`fixed top-24 right-6 bg-white shadow-xl border border-gray-200 rounded-2xl p-4 w-64 flex items-center space-x-4 hover:shadow-2xl transition-all duration-300 z-40 ${
        isOpen ? "hidden" : "block"
      }`}
      aria-label="Open Drug & Disease Chat"
    >
      <div className="bg-green-100 text-green-600 p-3 rounded-full text-2xl">
        💊
      </div>
      <div className="flex flex-col items-start">
        <span className="text-gray-800 font-semibold text-base">
          Drug & Disease Chat
        </span>
      </div>
      
      {/* Optional: Add a notification dot */}
      <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
    </motion.button>
  );
};

// Main Chat Component
const DrugDiseaseChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "👋 Welcome to SympCare - Your Healthcare Drug Disease Assistant!",
    },
    { sender: "bot", text: "How can I help you today?" },
  ]);
  const [input, setInput] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef(null);
  const recognition = useRef(null);
  const navigate = useNavigate();
  const [voices, setVoices] = useState([]);

  const toggleChat = () => {
    if (isOpen) {
      // Chat is being closed, stop any ongoing speech
      window.speechSynthesis.cancel();
    }
    setIsOpen((prev) => !prev);
    setIsMaximized(false);
  };

  const toggleMaximize = () => {
    setIsMaximized((prev) => !prev);
  };

  useEffect(() => {
    // Initialize Speech Recognition
    if (window.SpeechRecognition || window.webkitSpeechRecognition) {
      recognition.current = new (window.SpeechRecognition ||
        window.webkitSpeechRecognition)();
      recognition.current.continuous = true;
      recognition.current.interimResults = true;
      recognition.current.lang = "en-US";

      recognition.current.onresult = (event) => {
        let interimTranscript = "";
        for (let i = event.resultIndex; i < event.results.length; i++) {
          interimTranscript += event.results[i][0].transcript;
        }
        setInput(interimTranscript);
      };

      recognition.current.onend = () => {
        setIsListening(false);
      };
    } else {
      console.error("Speech Recognition not supported in this browser.");
    }
  }, []);

  const toggleListening = () => {
    if (!recognition.current) return;

    if (isListening) {
      recognition.current.stop();
      setIsListening(false);
    } else {
      recognition.current.start();
      setIsListening(true);
    }
  };

  const sendMessage = async (message) => {
    if (!message.trim()) return;

    if (isListening && recognition.current) {
      recognition.current.stop();
      setIsListening(false);
    }

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
        {
          sender: "bot",
          text: "⚠️ Error: Unable to reach server! Please try again later.",
        },
      ]);
    } finally {
      setIsThinking(false);
    }
  };

  useEffect(() => {
    // Scroll to bottom
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isThinking]);

  useEffect(() => {
    // Load voices for Speech Synthesis
    const synth = window.speechSynthesis;
    const loadVoices = () => {
      const availableVoices = synth.getVoices();
      setVoices(availableVoices);
    };
    loadVoices();
    if (synth.onvoiceschanged !== undefined) {
      synth.onvoiceschanged = loadVoices;
    }
  }, []);

  const speakResponse = (text) => {
    const synth = window.speechSynthesis;
    synth.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    const isHindi = /[\u0900-\u097F]/.test(text);

    // Try to pick an Indian English or Hindi female voice
    const preferredVoice = voices.find(
      (voice) =>
        (voice.lang === "hi-IN" || voice.lang === "en-IN") &&
        voice.name.toLowerCase().includes("female")
    );

    // Fallback to any Indian voice
    const fallbackVoice = voices.find(
      (voice) => voice.lang === "hi-IN" || voice.lang === "en-IN"
    );

    utterance.voice = preferredVoice || fallbackVoice || null;

    if (utterance.voice) {
      synth.speak(utterance);
    } else {
      console.warn("No suitable voice found.");
    }
  };

  useEffect(() => {
    if (
      messages.length > 0 &&
      messages[messages.length - 1].sender === "bot" &&
      voices.length > 0
    ) {
      speakResponse(messages[messages.length - 1].text);
    }
  }, [messages, voices]);

  return (
    <>
      {/* Chatbot Button - Always visible when chat is closed */}
      <ChatbotButton isOpen={isOpen} toggleChat={toggleChat} />
      
      {/* Chat Window */}
      {isOpen && (
        <div
          className={`${
            isMaximized
              ? "fixed inset-0 flex justify-center items-center z-50"
              : "fixed top-16 right-28 flex justify-start items-start z-50"
          }`}
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-lg h-[90vh] max-h-[600px] bg-white shadow-2xl rounded-2xl flex flex-col border border-gray-200"
          >
            {/* Header */}
            <div className="bg-primary p-4 flex justify-between items-center rounded-t-2xl">
              <h3 className="text-white text-lg font-bold">
                Drug Disease AI Assistant
              </h3>
              <div className="flex space-x-3">
                <button 
                  onClick={toggleMaximize} 
                  className="text-white text-xl hover:text-gray-200 transition-colors"
                  aria-label={isMaximized ? "Minimize" : "Maximize"}
                >
                  {isMaximized ? <FaWindowMinimize /> : <FaWindowMaximize />}
                </button>
                <button 
                  onClick={toggleChat} 
                  className="text-white text-xl hover:text-gray-200 transition-colors"
                  aria-label="Close chat"
                >
                  <FaTimes />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto flex flex-col space-y-3 bg-gray-50">
              {messages.map((msg, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`max-w-xs p-3 rounded-lg shadow-md whitespace-pre-wrap ${
                    msg.sender === "bot"
                      ? "bg-primary text-white self-start"
                      : "bg-blue-500 text-white self-end"
                  }`}
                >
                  {msg.sender === "bot" ? (
                    <ReactMarkdown>{msg.text}</ReactMarkdown>
                  ) : (
                    msg.text
                  )}
                </motion.div>
              ))}

              {isThinking && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="self-start flex space-x-1 p-2"
                >
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.6s]"></span>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t bg-white flex items-center space-x-2">
              <textarea
                rows="1"
                className="flex-1 p-2 border rounded-lg outline-none resize-none overflow-auto max-h-32 focus:border-primary transition-colors"
                placeholder="Type a message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onInput={(e) => {
                  e.target.style.height = "auto";
                  e.target.style.height = `${Math.min(
                    e.target.scrollHeight,
                    128
                  )}px`;
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    sendMessage(input);
                  }
                }}
              />

              <button
                onClick={toggleListening}
                className={`p-3 rounded-lg transition-colors ${
                  isListening 
                    ? "bg-red-500 hover:bg-red-600" 
                    : "bg-primary hover:bg-primary-dark"
                } text-white`}
                aria-label={isListening ? "Stop listening" : "Start voice input"}
              >
                {isListening ? <FaMicrophoneSlash /> : <FaMicrophone />}
              </button>

              <button
                onClick={() => sendMessage(input)}
                disabled={!input.trim() || isThinking}
                className="bg-primary hover:bg-primary-dark text-white p-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Send message"
              >
                <FaPaperPlane />
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
};

export default DrugDiseaseChat;