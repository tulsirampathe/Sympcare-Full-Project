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
  FaArrowRight,
  FaRobot,
  FaPaperPlane,
  FaCheckCircle,
  FaExclamationCircle,
} from "react-icons/fa";

const ReportAnalysis = () => {
  const [file, setFile] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chartData, setChartData] = useState([]);
  const [insightCards, setInsightCards] = useState([]);
  const [summary, setSummary] = useState("");
  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: "Hello! I’m your AI Health Assistant. You can ask me anything about your report 😊",
    },
  ]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

const handleAnalyze = async () => {
  if (!file) return;

  setIsAnalyzing(true);
  setShowResult(false);

  const formData = new FormData();
  formData.append("pdf", file);

  const res = await fetch("http://127.0.0.1:5000/analyze-report", {
    method: "POST",
    body: formData,
  });

  const data = await res.json();
  console.log("Parsed Response:", data);

  // ✅ Update summary
  setSummary(data.summary || "");

  // ✅ Update graph
  setChartData(
    data.parameters?.map((p) => ({
      name: p.name,
      patient: p.patient,
      normal: (p.normal_min + p.normal_max) / 2,
    })) || []
  );

  // ✅ Update insights list
  setInsightCards(data.insights || []);

  setIsAnalyzing(false);
  setShowResult(true);
};


  const handleSendMessage = async () => {
    if (!chatInput.trim()) return;

    const userMsg = chatInput;
    setMessages((prev) => [...prev, { sender: "user", text: userMsg }]);
    setChatInput("");

    const res = await fetch("http://127.0.0.1:5000/report-chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: userMsg }),
    });

    const reader = res.body.getReader();
    let fullText = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      fullText += new TextDecoder().decode(value);

      setMessages((prev) => [
        ...prev.filter((m) => m.sender !== "stream"),
        { sender: "stream", text: fullText },
      ]);
    }

    setMessages((prev) => [
      ...prev.filter((m) => m.sender !== "stream"),
      { sender: "ai", text: fullText },
    ]);
  };

  return (
    <section className="px-6 py-20 max-w-7xl mx-auto">
      <motion.div
        className="text-center mb  -12"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-4xl font-bold text-gray-900">
          Medical <span className="text-blue-500">Report Analysis</span>
        </h2>
        <p className="text-gray-600 text-lg mt-3">
          Upload your health report and get smart AI insights 🩺✨
        </p>
      </motion.div>

      {!showResult && (
        <motion.div
          className="max-w-2xl mx-auto bg-white border-2 border-dashed border-blue-300
          rounded-2xl p-10 text-center shadow-lg"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <FaUpload className="mx-auto text-4xl text-blue-500 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Upload Medical Report</h3>
          <input
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={handleFileChange}
            className="hidden"
            id="fileUpload"
          />
          <label
            htmlFor="fileUpload"
            className="cursor-pointer bg-blue-500 text-white px-6 py-3 rounded-xl"
          >
            Choose File
          </label>

          {file && <p className="mt-4 text-blue-600">{file.name}</p>}

          {file && (
            <motion.button
              onClick={handleAnalyze}
              className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-xl font-bold"
              whileHover={{ scale: 1.05 }}
            >
              Analyze Report <FaArrowRight />
            </motion.button>
          )}

          {isAnalyzing && (
            <div className="mt-6 text-blue-600 font-semibold">Analyzing...</div>
          )}
        </motion.div>
      )}

      {showResult && (
        <>
          <motion.div
            className="mt-16 flex flex-col lg:flex-row gap-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="bg-white rounded-3xl shadow-lg p-8 w-full lg:w-2/3">
              <h3 className="text-2xl font-bold mb-6">Health Parameter Graph</h3>
              <ResponsiveContainer width="100%" height={350}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="normal" stroke="#9CA3AF" strokeWidth={3} />
                  <Line type="monotone" dataKey="patient" stroke="#3B82F6" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="w-full lg:w-1/3 flex flex-col gap-5">
              <h3 className="text-2xl font-bold">AI Findings</h3>
              {insightCards.map((item, index) => (
                <div key={index} className="p-4 bg-white shadow rounded-xl border-l-4 border-blue-400">
                  <p className="font-bold">{item.parameter}</p>
                  <p className="text-sm">
                    <strong>{item.status}:</strong> {item.message}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          <div className="bg-blue-50 border border-blue-200 p-5 rounded-2xl shadow mt-10">
            <h3 className="text-xl font-bold text-blue-600">AI Summary</h3>
            <p className="text-gray-700 mt-2">{summary}</p>
          </div>

          <motion.div
            className="mt-16 bg-white rounded-3xl shadow-lg p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <h3 className="text-2xl font-bold flex items-center gap-3 mb-4">
              <FaRobot className="text-blue-500" /> Chat About Your Report
            </h3>

            <div className="h-80 overflow-y-auto border p-4 bg-gray-50 rounded-2xl flex flex-col gap-3 mb-4">
              {messages.map((msg, index) => (
                <div key={index} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-xs p-3 rounded-2xl ${
                      msg.sender === "user" ? "bg-blue-500 text-white" : "bg-white border"
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
                className="flex-grow border rounded-xl px-4 py-3"
                placeholder="Ask something about your report..."
              />
              <button
                onClick={handleSendMessage}
                className="bg-blue-600 text-white px-5 py-3 rounded-xl"
              >
                <FaPaperPlane /> Send
              </button>
            </div>
          </motion.div>

          <div className="text-center mt-12">
            <button
              onClick={() => {
                setShowResult(false);
                setFile(null);
              }}
              className="bg-blue-600 text-white px-8 py-3 rounded-xl"
            >
              Upload Another Report
            </button>
          </div>
        </>
      )}
    </section>
  );
};

export default ReportAnalysis;
