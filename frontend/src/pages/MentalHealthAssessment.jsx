import React, { useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import axios from "axios";

const options = [
  { value: 1, label: "😃 Very Low" },
  { value: 2, label: "🙂 Low" },
  { value: 3, label: "😐 Moderate" },
  { value: 4, label: "😕 High" },
  { value: 5, label: "😢 Very High" },
];

const MentalHealthAssessment = () => {
  const [messages, setMessages] = useState([]);
  const [role, setRole] = useState("");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState([]);

  const questionsByRole = {
    Student: [
      "Do you often feel overwhelmed by academic pressure?",
      "Do you struggle to concentrate during lectures or while studying?",
      "How often do you feel anxious before exams or assignments?",
      "Do you experience difficulty balancing academic and personal life?",
      "Have you lost interest in extracurricular activities you once enjoyed?",
      "Do you frequently procrastinate on assignments due to mental exhaustion?",
      "Do you feel socially isolated or disconnected from your peers?",
      "How often do you experience self-doubt about your abilities?",
      "Do you feel that you are not performing as well as you should be?",
      "Have you ever experienced difficulty sleeping due to academic stress?",
    ],
    "Working Professional": [
      "Do you feel emotionally exhausted at the end of the workday?",
      "How often do you struggle with motivation for work-related tasks?",
      "Do you find it difficult to disconnect from work during personal time?",
      "How often do you experience stress due to deadlines and workload?",
      "Do you feel unappreciated for your contributions at work?",
      "How frequently do you worry about job security or career growth?",
      "Do you find it difficult to focus on tasks without getting distracted?",
      "How often do you experience physical symptoms like headaches due to work stress?",
      "Do you feel that your work-life balance is unhealthy?",
      "How frequently do you consider quitting due to mental exhaustion?",
    ],
    "Housewife/Homemaker": [
      "Do you feel that your daily responsibilities are overwhelming?",
      "How often do you experience feelings of loneliness or isolation?",
      "Do you feel like you have enough personal time for yourself?",
      "How do you handle moments of stress or frustration?",
      "Do you get enough social interaction outside of your home responsibilities?",
    ],
    "Healthcare Professional": [
      "Do you frequently feel emotionally drained after patient interactions?",
      "How often do you experience stress due to long working hours?",
      "Do you find it difficult to manage work-related stress in the workplace?",
      "Do you feel that your mental health is being compromised due to the emotional toll of your job?",
      "How do you unwind after a stressful shift?",
    ],
    "IT Tech Employee": [
      "How often do you experience stress due to tight project deadlines?",
      "Do you feel mentally exhausted from coding or troubleshooting issues?",
      "How do you handle prolonged periods of screen time or sitting at your desk?",
      "Do you find it challenging to disconnect from work after office hours?",
      "How often do you experience frustration with technical issues at work?",
    ],
  };

  const handleOptionClick = (value) => {
    const updatedResponses = [...responses, value];
    setResponses(updatedResponses);

    // Show selected response in chat
    setMessages((prev) => [
      ...prev,
      { text: options[value-1].label, sender: "user" },
    ]);

    if (currentQuestionIndex < questionsByRole[role].length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      const nextQuestion = questionsByRole[role][currentQuestionIndex + 1];
      setMessages((prev) => [...prev, { text: nextQuestion, sender: "bot" }]);
    } else {
      sendToBackend(updatedResponses);
    }
  };

  const sendToBackend = async (responses) => {
    try {
      const res = await axios.post("http://localhost:5000/assess", {
        role,
        responses,
      });
      setMessages((prev) => [
        ...prev,
        { text: res.data.message, sender: "bot" },
      ]);
    } catch (error) {
      console.error("Error sending to backend:", error);
    }
  };

  const handleRoleSelection = (selectedRole) => {
    setRole(selectedRole);
    setMessages([
      { text: questionsByRole[selectedRole][0], sender: "bot" },
    ]);
  };

  return (
    <div className="px-6 md:px-12 lg:px-24">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-800">
          CHAT WITH <span className="text-blue-600">US</span>
        </h2>
        <p className="text-gray-600 mt-2">We're here to support you!</p>
      </div>

      <div className="mt-12 flex flex-col md:flex-row items-center gap-12">
        <div className="md:w-1/2">
          <img
            className="w-full max-w-md rounded-lg shadow-xl hover:scale-105 transition-transform duration-300"
            src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExODdtZzg1c3BqZjZreXZxb3IweHNhaDY0bHAyNDY2d2sxaWFsNnB0ZCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/20NLMBm0BkUOwNljwv/giphy.gif"
            alt="Chatbot GIF"
          />
        </div>

        <div className="md:w-1/2 bg-white shadow-lg rounded-lg p-6">
          <h3 className="text-xl font-semibold text-gray-800 text-center">
            Mental <span className="text-primary">Health Chatbot</span>
          </h3>

          {!role ? (
            <div className="mt-4 text-center">
              <p className="text-gray-700 mb-2">Please select your role:</p>
              <div className="flex justify-center gap-4 flex-wrap">
                {Object.keys(questionsByRole).map((role) => (
                  <button
                    key={role}
                    className="px-6 py-3 bg-blue-500 text-white rounded-lg text-lg shadow-lg hover:bg-blue-600"
                    onClick={() => handleRoleSelection(role)}
                  >
                    {role}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <>
              <ScrollToBottom className="h-80 overflow-y-auto border p-3 mt-3 rounded bg-gray-100">
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`p-2 ${
                      msg.sender === "user" ? "text-right" : "text-left"
                    }`}
                  >
                    <span
                      className={`inline-block p-2 rounded-lg ${
                        msg.sender === "user"
                          ? "bg-blue-500 text-white"
                          : "bg-gray-300 text-black"
                      }`}
                    >
                      {msg.text}
                    </span>
                  </div>
                ))}
              </ScrollToBottom>

              {/* Show Options for the Current Question */}
              {messages.length > 0 &&
                messages[messages.length - 1].sender === "bot" && (
                  <div className="mt-3 flex justify-center gap-3 flex-wrap">
                    {options.map((option) => (
                      <button
                        key={option.value}
                        onClick={() =>
                          handleOptionClick(option.value, option.label)
                        }
                        className="px-4 py-2 bg-gray-200 rounded-lg shadow-md hover:bg-gray-300 transition-all"
                      >
                        {option.label}
                      </button> 
                    ))}
                  </div>
                )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MentalHealthAssessment;
