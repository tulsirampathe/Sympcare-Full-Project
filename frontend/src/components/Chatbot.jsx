import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaPaperPlane,
  FaTimes,
  FaWindowMaximize,
  FaWindowMinimize,
  FaMicrophone,
} from "react-icons/fa";
import Lottie from "lottie-react";
import chatbotAnimation from "../assets/chatbot.json";
import { useNavigate } from "react-router-dom";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "👋 Welcome to SympCare - Your Healthcare Assistant!" },
    { sender: "bot", text: "How can I help you today? 😊" },
  ]);
  const [input, setInput] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [timeoutId, setTimeoutId] = useState(null);
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();

  const recognition = useRef(null);

  const toggleChat = () => {
    const newState = !isOpen;
    setIsOpen(newState);

    if (newState && recognition.current && !isListening) {
      recognition.current.start();
      setIsListening(true);
    }
  };

  const toggleMaximize = () => setIsMaximized(!isMaximized);

  useEffect(() => {
    if (window.SpeechRecognition || window.webkitSpeechRecognition) {
      recognition.current = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
      recognition.current.continuous = true;
      recognition.current.interimResults = true;

      recognition.current.onresult = (event) => {
        const transcript = event.results[event.resultIndex][0].transcript;
        setInput(transcript);
        clearTimeout(timeoutId);
        const newTimeoutId = setTimeout(() => {
          handleVoiceCommand(transcript);
        }, 1000);
        setTimeoutId(newTimeoutId);
      };

      recognition.current.onend = () => {
        setIsListening(false);
      };
    } else {
      console.log("Speech Recognition API is not supported in this browser.");
    }
  }, [timeoutId]);

  const handleVoiceCommand = (command) => {
    setMessages((prev) => [...prev, { sender: "user", text: command }]);
    setInput("");

    if (command.toLowerCase().includes("home page")) {
      setMessages((prev) => [...prev, { sender: "bot", text: "Navigating to Home..." }]);
      navigate("/home");
    } else if (command.toLowerCase().includes("appointments")) {
      setMessages((prev) => [...prev, { sender: "bot", text: "Opening Appointment page..." }]);
      navigate("/appointments");
    } else {
      sendMessage(command);
    }

    recognition.current.stop();
    setIsListening(false);
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
        { sender: "bot", text: "⚠ Error: Unable to reach server! Please try again later." },
      ]);
    } finally {
      setIsThinking(false);
    }
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      const isAtBottom =
        messagesEndRef.current.getBoundingClientRect().bottom <= window.innerHeight;
      if (isAtBottom) {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [messages, isThinking]);

  const [voices, setVoices] = useState([]);

  useEffect(() => {
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
    const selectedVoice = voices.find((voice) =>
      isHindi
        ? voice.lang === "hi-IN" || voice.name.toLowerCase().includes("hindi")
        : voice.lang.startsWith("en") || voice.name.toLowerCase().includes("english")
    );

    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }

    synth.speak(utterance);
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

  const toggleListening = () => {
    if (recognition.current) {
      if (isListening) {
        recognition.current.stop();
        setIsListening(false);
      } else {
        recognition.current.start();
        setIsListening(true);
      }
    }
  };

  return (
    <div
      className={`${
        isMaximized
          ? "fixed inset-0 flex justify-center items-center z-50"
          : "fixed bottom-5 right-5 z-50"
      }`}
    >
      {isOpen ? (
        <motion.div className="w-full max-w-lg h-[90vh] max-h-[600px] bg-white shadow-2xl rounded-2xl flex flex-col border border-gray-200">
          {/* Header */}
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

          {/* Messages */}
          <div className="p-4 h-full overflow-y-auto flex flex-col space-y-3 bg-gray-50">
            {messages.map((msg, index) => (
              <motion.div
                key={index}
                className={`max-w-xs p-3 rounded-lg shadow-md ${
                  msg.sender === "bot"
                    ? "bg-primary text-white self-start"
                    : "bg-blue-500 text-white self-end"
                }`}
              >
                {msg.text}
              </motion.div>
            ))}
            {isThinking && (
              <div className="self-start flex space-x-1 p-2">
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.6s]"></span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          
          {/* Input */}
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
            <button onClick={toggleListening} className="bg-primary text-white px-4 py-2 rounded-lg ml-2">
              <FaMicrophone />
            </button>
          </div>
        </motion.div>
      ) : (
        <motion.button
          onClick={toggleChat}
          className="text-white hover:scale-110 transform transition flex items-center"
        >
          <div className="w-28 h-28">
            <Lottie animationData={chatbotAnimation} loop={true} />
          </div>
        </motion.button>
      )}
    </div>
  );
};

export default Chatbot;
