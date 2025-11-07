import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import {
  FaUpload,
  FaArrowRight,
  FaPaperPlane,
  FaMicrophone,
  FaMicrophoneSlash,
} from "react-icons/fa";

const ReportAnalysis = () => {
  const [file, setFile] = useState(null);
  const [summary, setSummary] = useState(
    "*Maintain a healthy weight*: Excess body fat can lead to chronic inflammation, which may worsen anemia or other conditions"
  );
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResult, setShowResult] = useState(true);
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "👋 Hi! I'm your AI Health Assistant. Let's discuss your medical report together.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef(null);
  const recognition = useRef(null);
  const [images, setImages] = useState([]);

  useEffect(() => {
    if (window.SpeechRecognition || window.webkitSpeechRecognition) {
      recognition.current = new (window.SpeechRecognition ||
        window.webkitSpeechRecognition)();
      recognition.current.continuous = true;
      recognition.current.interimResults = true;
      recognition.current.lang = "en-US";

      recognition.current.onresult = (event) => {
        let interim = "";
        for (let i = event.resultIndex; i < event.results.length; i++) {
          interim += event.results[i][0].transcript;
        }
        setInput(interim);
      };
      recognition.current.onend = () => setIsListening(false);
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

  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleAnalyze = async () => {
    if (!file) return;
    setIsAnalyzing(true);
    setShowResult(false);
    const formData = new FormData();
    formData.append("pdf", file);

    try {
      const res = await fetch("http://127.0.0.1:5000/analyze-report", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Failed to analyze report");
      const data = await res.json();
      setSummary(data.summary || "No summary available.");
      setShowResult(true);
    } catch (err) {
      console.error(err);
      alert("Error analyzing report. Please try again.");
    } finally {
      setIsAnalyzing(false);
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
      const response = await fetch("http://127.0.0.1:5000/report-chat", {
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
          text: "⚠️ Error: Unable to reach the server. Please try again later.",
        },
      ]);
    } finally {
      setIsThinking(false);
    }
  };

  return (
    <section className="px-6 py-20 max-w-5xl mx-auto">
      {/* Header */}
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-4xl font-bold text-gray-900">
          Medical <span className="text-blue-600">Report Analysis</span>
        </h2>
        <p className="text-gray-600 text-lg mt-3">
          Upload your medical report and chat with the AI to understand it.
        </p>
      </motion.div>

      {/* Upload Box */}
      {!showResult && (
        <motion.div
          className="max-w-2xl mx-auto bg-white border-2 border-dashed border-blue-400 rounded-2xl p-10 text-center shadow-lg"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <FaUpload className="mx-auto text-4xl text-blue-500 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Upload Report</h3>

          <input
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={handleFileChange}
            className="hidden"
            id="fileUpload"
          />
          <label
            htmlFor="fileUpload"
            className="cursor-pointer bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition"
          >
            Choose File
          </label>

          {file && <p className="mt-4 text-blue-600">{file.name}</p>}

          {file && (
            <motion.button
              onClick={handleAnalyze}
              className="mt-6 bg-blue-700 text-white px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2 mx-auto hover:bg-blue-800 transition"
              whileHover={{ scale: 1.05 }}
            >
              Analyze Report <FaArrowRight />
            </motion.button>
          )}

          {isAnalyzing && (
            <div className="mt-6 text-blue-700 font-semibold animate-pulse">
              Analyzing report... 🩺
            </div>
          )}
        </motion.div>
      )}

      {showResult && (
        <div className="flex flex-col lg:flex-row gap-8 mt-10">
          {/* Summary Section */}
          <motion.div
            className="bg-blue-50 border border-blue-200 p-6 rounded-2xl shadow flex-1 max-h-[500px] overflow-y-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <h3 className="text-xl font-bold text-blue-700 mb-3">
              🧾 AI Summary
            </h3>
            <ReactMarkdown>{summary}</ReactMarkdown>
          </motion.div>

          {/* Chat Section */}
          <motion.div
            className="bg-white rounded-3xl shadow-lg border border-gray-200 p-6 flex flex-col h-[500px] flex-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto bg-blue-50 p-4 rounded-2xl flex flex-col space-y-3">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex w-full ${
                    msg.sender === "bot" ? "justify-start" : "justify-end"
                  }`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl shadow-md break-words ${
                      msg.sender === "bot"
                        ? "bg-blue-600 text-white rounded-bl-none"
                        : "bg-blue-400 text-white rounded-br-none"
                    }`}
                  >
                    {msg.sender === "bot" ? (
                      <ReactMarkdown>{msg.text}</ReactMarkdown>
                    ) : (
                      msg.text
                    )}
                  </div>
                </div>
              ))}

              {/* Typing Indicator */}
              {isThinking && (
                <div className="flex justify-start space-x-1 p-2">
                  <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                  <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                  <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce [animation-delay:0.6s]" />
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Section */}
            <div className="p-3 border-t bg-white flex items-center space-x-2">
              <textarea
                rows="1"
                className="flex-1 p-2 border rounded-lg outline-none resize-none overflow-auto max-h-28"
                placeholder="Ask something about your report..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onInput={(e) => {
                  e.target.style.height = "auto";
                  e.target.style.height = `${Math.min(
                    e.target.scrollHeight,
                    112
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
                className={`ml-2 px-4 py-2 rounded-lg ${
                  isListening ? "bg-red-500" : "bg-blue-600"
                } text-white`}
              >
                {isListening ? <FaMicrophoneSlash /> : <FaMicrophone />}
              </button>
              <button
                onClick={() => sendMessage(input)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                <FaPaperPlane />
              </button>
            </div>

            {/* 🩺 Lifestyle Button */}
            <div className="mt-3 flex justify-center">
              <button
                onClick={() =>
                  sendMessage("can you give Get Lifestyle Recommendations")
                }
                className="bg-green-600 text-white px-6 py-2 rounded-xl shadow-md hover:bg-green-700 transition-all"
              >
                🌿 Get Lifestyle Recommendations
              </button>
            </div>
          </motion.div>

          {/* 🖼️ Dynamic Image Section */}
          <motion.div
            className="bg-white rounded-2xl shadow-lg border border-gray-200 p-4 flex flex-col flex-1 max-h-[500px] overflow-y-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <h3 className="text-xl font-bold text-blue-700 mb-3">
              📸 Related Images
            </h3>
            {images && images.length > 0 ? (
              <div className="grid grid-cols-2 gap-3">
                {images.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`Result ${index + 1}`}
                    className="rounded-xl shadow-md object-cover w-full h-32 hover:scale-105 transition-transform"
                  />
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center">No images available</p>
            )}
          </motion.div>
        </div>
      )}

      {showResult && (
        <div className="text-center mt-10">
          <button
            onClick={() => {
              setShowResult(false);
              setFile(null);
            }}
            className="bg-blue-600 text-white px-8 py-3 rounded-xl hover:bg-blue-700 transition"
          >
            Upload Another Report
          </button>
        </div>
      )}
    </section>
  );
};

export default ReportAnalysis;
