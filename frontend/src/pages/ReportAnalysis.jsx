// ReportAnalysis.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import {
  FaUpload,
  FaFileMedical,
  FaCheckCircle,
  FaExclamationCircle,
  FaArrowRight,
  FaRobot,
  FaUser,
  FaPaperPlane,
} from "react-icons/fa";

const ReportAnalysis = () => {
  const [file, setFile] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: "Hello! I’m your AI Health Assistant. You can ask me questions about your report or get suggestions based on your results.",
    },
  ]);

  const mockData = [
    { name: "Hemoglobin", patient: 11.2, normal: 13.5 },
    { name: "WBC", patient: 7.4, normal: 7.0 },
    { name: "Platelets", patient: 460, normal: 350 },
    { name: "RBC", patient: 4.1, normal: 4.7 },
    { name: "Glucose", patient: 98, normal: 90 },
    { name: "Cholesterol", patient: 210, normal: 180 },
  ];

  const insights = [
    {
      parameter: "Hemoglobin",
      status: "Low",
      message: "Slightly below normal — possible mild anemia.",
      color: "border-red-400 bg-red-50 text-red-600",
      icon: <FaExclamationCircle />,
    },
    {
      parameter: "WBC",
      status: "Normal",
      message: "Within healthy range — immune system looks stable.",
      color: "border-green-400 bg-green-50 text-green-600",
      icon: <FaCheckCircle />,
    },
    {
      parameter: "Platelets",
      status: "High",
      message: "Slightly elevated — could indicate mild inflammation.",
      color: "border-yellow-400 bg-yellow-50 text-yellow-600",
      icon: <FaExclamationCircle />,
    },
  ];

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleAnalyze = () => {
    if (!file) return;
    setIsAnalyzing(true);
    setShowResult(false);
    setTimeout(() => {
      setIsAnalyzing(false);
      setShowResult(true);
    }, 2500);
  };

  const handleSendMessage = () => {
    if (!chatInput.trim()) return;

    const newMessage = { sender: "user", text: chatInput };
    setMessages((prev) => [...prev, newMessage]);
    setChatInput("");

    // Mock AI response delay
    setTimeout(() => {
      const aiResponse = {
        sender: "ai",
        text:
          "Based on your report, maintaining a balanced diet and staying hydrated will support your recovery. Would you like me to suggest a meal plan?",
      };
      setMessages((prev) => [...prev, aiResponse]);
    }, 1200);
  };

  return (
    <section className="px-6 py-20 max-w-7xl mx-auto">
      {/* Header */}
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="inline-flex items-center mb-4 space-x-3">
          <div className="w-12 h-1 bg-blue-500 rounded-full"></div>
          <h3 className="text-lg font-semibold text-blue-500">AI Health Insight</h3>
          <div className="w-12 h-1 bg-blue-500 rounded-full"></div>
        </div>
        <h2 className="text-4xl font-bold text-gray-900 mb-3">
          Medical <span className="text-blue-500">Report Analysis</span>
        </h2>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Upload your health report and get instant, AI-powered insights — simple, accurate, and secure.
        </p>
      </motion.div>

      {/* Upload Box */}
      {!showResult && (
        <motion.div
          className="max-w-2xl mx-auto bg-white border-2 border-dashed border-blue-300 rounded-2xl p-10 text-center shadow-lg hover:border-blue-500 transition-all"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <FaUpload className="mx-auto text-4xl text-blue-500 mb-4" />
          <h3 className="text-xl font-semibold mb-2 text-gray-800">
            Upload your Medical Report
          </h3>
          <p className="text-gray-500 mb-6">Supported formats: PDF, JPG, PNG</p>

          <input
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={handleFileChange}
            className="hidden"
            id="fileUpload"
          />
          <label
            htmlFor="fileUpload"
            className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-xl transition"
          >
            Choose File
          </label>

          {file && (
            <p className="mt-4 text-blue-600 font-medium">{file.name}</p>
          )}

          {file && (
            <motion.button
              onClick={handleAnalyze}
              className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2 mx-auto hover:bg-blue-700 transition"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Analyze Report
              <FaArrowRight className="text-sm" />
            </motion.button>
          )}

          {/* Loading Simulation */}
          {isAnalyzing && (
            <motion.div
              className="mt-8 text-blue-600 font-semibold flex flex-col items-center gap-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-500 border-solid"></div>
              <p>Analyzing your report...</p>
            </motion.div>
          )}
        </motion.div>
      )}

      {/* Result Section */}
      {showResult && (
        <>
          <motion.div
            className="mt-16 flex flex-col lg:flex-row gap-10 items-start"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            {/* Chart Section */}
            <div className="bg-white rounded-3xl shadow-lg p-8 w-full lg:w-2/3 border border-blue-100">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">
                Health Parameters Comparison
              </h3>
              <ResponsiveContainer width="100%" height={350}>
                <LineChart data={mockData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="normal"
                    stroke="#9CA3AF"
                    strokeWidth={3}
                    dot={{ r: 4 }}
                    name="Normal Range"
                  />
                  <Line
                    type="monotone"
                    dataKey="patient"
                    stroke="#3B82F6"
                    strokeWidth={3}
                    dot={{ r: 5 }}
                    activeDot={{ r: 8 }}
                    name="Patient Value"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Insights Section */}
            <div className="w-full lg:w-1/3 flex flex-col gap-5">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                AI Summary Insights
              </h3>
              {insights.map((item, index) => (
                <motion.div
                  key={index}
                  className={`p-5 rounded-2xl border-l-4 ${item.color} flex items-start gap-3 shadow-sm hover:shadow-md transition`}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="text-xl mt-1">{item.icon}</div>
                  <div>
                    <h4 className="font-bold text-lg">{item.parameter}</h4>
                    <p className="text-sm mt-1">{item.message}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Chat Section */}
          <motion.div
            className="mt-16 bg-white rounded-3xl shadow-lg p-8 border border-blue-100"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
              <FaRobot className="text-blue-500" /> Chat with AI
            </h3>

            <div className="h-80 overflow-y-auto border border-gray-200 rounded-2xl p-4 bg-gray-50 flex flex-col gap-3 mb-4">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${
                    msg.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-xs p-3 rounded-2xl text-sm shadow ${
                      msg.sender === "user"
                        ? "bg-blue-500 text-white rounded-br-none"
                        : "bg-white text-gray-800 border border-gray-200 rounded-bl-none"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-3">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Ask about your report..."
                className="flex-grow border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-400 outline-none"
              />
              <button
                onClick={handleSendMessage}
                className="bg-blue-600 text-white px-5 py-3 rounded-xl hover:bg-blue-700 transition flex items-center gap-2"
              >
                <FaPaperPlane /> Send
              </button>
            </div>
          </motion.div>

          {/* Footer */}
          <div className="text-center mt-12">
            <motion.button
              onClick={() => {
                setShowResult(false);
                setFile(null);
              }}
              className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Upload Another Report
            </motion.button>
          </div>
        </>
      )}
    </section>
  );
};

export default ReportAnalysis;
