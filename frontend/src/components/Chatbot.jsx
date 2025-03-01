import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import chatbotAnimation from "../assets/chatbot.json";
import { FaPaperPlane, FaImage, FaTimes, FaWindowMaximize, FaWindowMinimize } from "react-icons/fa";

const qaResponses = {
  
    "hi": "Hello! How can I assist you today? 😊",
  "hello": "Hey there! What can I do for you?",
  "hey": "Hi! Need any health advice?",
  "good morning": "Good morning! Hope you're having a great day! ☀️",
  "good afternoon": "Good afternoon! How can I help?",
  "good evening": "Good evening! What health concerns do you have?",
  "how are you?": "I'm just a chatbot, but I'm here to help you! 😊",
  "tell me a joke": "Why did the scarecrow win an award? Because he was outstanding in his field! 😂",
  "tell me a fun fact": "Did you know? Honey never spoils! Archaeologists have found pots of honey in ancient Egyptian tombs that are over 3000 years old and still edible! 🍯",
  "what's your favorite color?": "I like all colors, but blue seems calming! 😊",
  "do you like music?": "I don't have ears, but I know that music can be very soothing! 🎵",
  "what is AI?": "AI, or Artificial Intelligence, is the simulation of human intelligence in machines that can learn, reason, and solve problems.",
  "how does machine learning work?": "Machine learning is a type of AI where computers learn from data and improve their performance without being explicitly programmed.",
  "what is the meaning of life?": "That’s a deep question! Some say it's 42, others say it's to seek happiness and knowledge. What do you think? 🤔",
  "how to stay healthy?": "Maintain a balanced diet, exercise regularly, stay hydrated, and get enough sleep.",
  "what is a fever?": "A fever is a temporary increase in body temperature, often due to an illness.",
  "how to reduce fever?": "You can reduce fever by drinking fluids, resting, and taking medications like paracetamol if necessary.",
  "what are the symptoms of covid-19?": "Common symptoms of COVID-19 include fever, cough, shortness of breath, and loss of taste or smell.",
  "what is the normal blood pressure range?": "A normal blood pressure range is around 120/80 mmHg.",
  "how much water should I drink daily?": "About 2-3 liters per day, depending on activity level and climate.",
  "how to boost energy naturally?": "Eat nutritious foods, get enough sleep, and exercise regularly.",
  "how to improve sleep quality?": "Maintain a consistent sleep schedule, avoid caffeine before bed, and keep your bedroom dark and cool.",
  "what are good exercises for beginners?": "Walking, yoga, bodyweight exercises, and light jogging.",
  "how to relieve back pain?": "Stretching, good posture, and core-strengthening exercises help relieve back pain.",
  "how to quit smoking?": "Nicotine replacement therapy, support groups, and behavioral therapy can help.",
  "how to reduce belly fat?": "Eat a healthy diet, do core exercises, and reduce sugar intake.",
  "how to improve focus and concentration?": "Get enough sleep, minimize distractions, and practice mindfulness.",
  "how to deal with anxiety?": "Try deep breathing, meditation, regular exercise, and talking to someone you trust.",
  "how to stay motivated?": "Set small goals, celebrate achievements, and find what excites you!",
  "how to be more productive?": "Prioritize tasks, take breaks, and avoid distractions.",
  "what is the best time to work out?": "Morning workouts boost metabolism; evening workouts improve strength.",
  "how to balance work and life?": "Set boundaries, take breaks, and spend time with loved ones.",
  "how to make new friends?": "Be open, join groups with similar interests, and start conversations! 😊",
  "what are some good books to read?": "Depends on your interest! Fiction: 'The Alchemist'; Science: 'A Brief History of Time'; Self-help: 'Atomic Habits'.",
  "how to start learning coding?": "Start with Python or JavaScript, follow online tutorials, and build projects!",
  "what are the benefits of meditation?": "Reduces stress, improves focus, and promotes emotional well-being.",
  "how to manage stress?": "Exercise, meditate, practice deep breathing, and take breaks from work.",
  "how to stop procrastinating?": "Break tasks into smaller parts, set deadlines, and remove distractions.",
  "what are the symptoms of vitamin D deficiency?": "Fatigue, bone pain, muscle weakness, and depression.",
  "how to improve gut health?": "Eat probiotics, stay hydrated, and consume high-fiber foods.",
  "how to get rid of bloating?": "Drink water, eat slowly, and avoid carbonated drinks.",
  "what are the benefits of yoga?": "Improves flexibility, reduces stress, and enhances overall health.",
  "how to increase confidence?": "Practice self-love, set small goals, and challenge your fears!",
  "how to get better at public speaking?": "Practice regularly, know your audience, and stay confident!",
  "how to learn a new language?": "Practice daily, watch movies in that language, and use apps like Duolingo!",
  "what are the symptoms of diabetes?": "Increased thirst, frequent urination, hunger, fatigue, and blurred vision.",
  "how to prevent a stroke?": "Maintain a healthy diet, exercise, and control blood pressure and cholesterol.",
  "what are the symptoms of heart attack?": "Chest pain, shortness of breath, and discomfort in arms, neck, jaw, or back.",
  "how to boost immunity?": "Eat a balanced diet, exercise, get enough sleep, and manage stress.",
  "what are the symptoms of anemia?": "Fatigue, pale skin, dizziness, and shortness of breath.",
  "how to relieve menstrual cramps?": "Use a heating pad, stay hydrated, and take pain relievers if needed."
  };
  


const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "👋 Welcome to **SympCare AI** - Your Healthcare Assistant!" },
    { sender: "bot", text: "I can assist with symptom analysis, skin disease detection, mental health tips, and more." },
    { sender: "bot", text: "How can I help you today? 😊" },
  ]);
  const [input, setInput] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();

  const toggleChat = () => {
    setIsOpen(!isOpen);
    setIsMaximized(false);
  };
  const toggleMaximize = () => setIsMaximized(!isMaximized);

  const sendMessage = async (message) => {
    if (!message.trim() && !imageFile) return;
    setMessages((prev) => [...prev, { sender: "user", text: message }]);
  
    const lowerCaseMessage = message.toLowerCase();
    if (qaResponses[lowerCaseMessage]) {
      setMessages((prev) => [...prev, { sender: "bot", text: qaResponses[lowerCaseMessage] }]);
      return;
    }

    setMessages((prev) => [...prev, { sender: "bot", text: "🤖 I'm not sure how to respond. Try another query!" }]);
    setInput("");
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className={`${isMaximized ? "fixed inset-0 flex justify-center items-center z-50" : "fixed bottom-5 right-5 z-50"}`}>
      {isOpen ? (
        <motion.div
          className={`${isMaximized ? "w-[90%] md:w-[60%] h-[80vh] md:h-[70vh]" : "w-full max-w-md h-[500px]"} bg-white shadow-2xl rounded-2xl overflow-hidden flex flex-col border border-gray-200`}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="bg-primary p-4 flex justify-between items-center rounded-t-2xl">
            <h3 className="text-white text-lg font-bold">SympCare AI Assistant</h3>
            <div className="flex space-x-3">
              <button onClick={toggleMaximize} className="text-white text-xl hover:scale-110 transition hidden md:inline-block">
                {isMaximized ? <FaWindowMinimize /> : <FaWindowMaximize />}
              </button>
              <button onClick={toggleChat} className="text-white text-xl hover:scale-110 transition">
                <FaTimes />
              </button>
            </div>
          </div>

          <div className="p-4 h-full overflow-y-auto flex flex-col space-y-3 bg-gray-50">
            {messages.map((msg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: msg.sender === "bot" ? -30 : 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
                className={`max-w-xs p-3 rounded-lg shadow-md ${msg.sender === "bot" ? "bg-primary text-white self-start" : "bg-blue-500 text-white self-end"}`}
              >
                {msg.text}
              </motion.div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-4 border-t bg-white flex items-center space-x-2">
            <input
              type="text"
              className="flex-1 p-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Type a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
            />
            <button onClick={() => sendMessage(input)} className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
              <FaPaperPlane />
            </button>
          </div>
        </motion.div>
      ) : (
        <motion.button onClick={toggleChat} className="text-white hover:scale-110 transform transition flex items-center" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
          <div className="w-28 h-28">
            <Lottie animationData={chatbotAnimation} loop={true} className="w-full h-full" />
          </div>
        </motion.button>
      )}
    </div>
  );
};

export default Chatbot;
