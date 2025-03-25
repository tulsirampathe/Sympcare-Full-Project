import React, { useContext, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { questionsByRole } from "../assets/assets";

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
  const [prediction, setPrediction] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Track loading state
  const navigate = useNavigate();

  const { doctors } = useContext(AppContext);
  const doctorsData = doctors.filter(doc => doc.speciality === "Psychologist ");

  const handleOptionClick = (value) => {
    const updatedResponses = [...responses, value];
    setResponses(updatedResponses);

    setMessages((prev) => [
      ...prev,
      { text: options[value - 1].label, sender: "user" },
    ]);

    // Show loading state before the next question
    setIsLoading(true);

    setTimeout(() => {
      if (currentQuestionIndex < questionsByRole[role].length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        const nextQuestion = questionsByRole[role][currentQuestionIndex + 1];
        setMessages((prev) => [
          ...prev,
          { text: nextQuestion, sender: "bot" },
        ]);
        setIsLoading(false); // Stop loading after the next question is shown
      } else {
        // Once all questions are answered, send the responses for prediction
        sendToBackend(updatedResponses);
      }
    }, 2000); // Simulate a 2-second delay before moving to the next question
  };

  const sendToBackend = async (responses) => {
    try {
      const res = await axios.post("http://127.0.0.1:5000/assess", {
        responses,
        role
      });

      const predictions = res.data.prediction;
      const maxPrediction = Object.entries(predictions).reduce((max, [key, value]) => {
        return value > max.value ? { key, value } : max;
      }, { key: "", value: 0 });

      setPrediction(maxPrediction.key);
      setMessages((prev) => [
        ...prev,
        { text: `Prediction: ${maxPrediction.key}`, sender: "bot" },
      ]);
      setIsLoading(false); // Stop loading after receiving prediction
    } catch (error) {
      console.error("Error sending to backend:", error);
      setIsLoading(false); // Stop loading in case of error
    }
  };

  const handleRoleSelection = (selectedRole) => {
    setRole(selectedRole);
    setMessages([{ text: questionsByRole[selectedRole][0], sender: "bot" }]);
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
                    className={`p-2 ${msg.sender === "user" ? "text-right" : "text-left"}`}
                  >
                    <span
                      className={`inline-block p-2 rounded-lg ${msg.sender === "user" ? "bg-blue-500 text-white" : "bg-gray-300 text-black"
                        }`}
                    >
                      {msg.text}
                    </span>
                  </div>
                ))}
              </ScrollToBottom>

              {isLoading && (
                <div className="text-center mt-4">
                  <div className="self-start flex space-x-1 p-2">
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.6s]"></span>
                  </div>
                </div>
              )}

              {!isLoading && messages.length > 0 && messages[messages.length - 1].sender === "bot" && (
                <div className="mt-3 flex justify-center gap-3 flex-wrap">
                  {options.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => handleOptionClick(option.value)}
                      className="px-6 py-3 bg-primary text-white rounded-lg text-lg shadow-lg hover:bg-secondary"
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

      {prediction && (
        <div className="bg-white p-6 rounded-lg shadow-lg mt-12">
          <h4 className="text-2xl font-semibold text-center mb-6">
            Suggested <span className="text-primary">Doctors</span>
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {doctorsData.map((doctor) => (
              <div
                key={doctor._id}
                className="bg-gray-100 p-4 rounded-lg shadow-md flex flex-col items-center"
              >
                <img
                  className="w-[120px] h-[120px] object-cover rounded-full shadow-md"
                  src={doctor.image}
                  alt={doctor.name}
                />
                <h5 className="text-lg font-semibold mt-3">{doctor.name}</h5>
                <p className="text-gray-600">{doctor.speciality}</p>

                {/* Doctor Availability */}
                <div className="flex items-center mt-2">
                  <span
                    className={`w-3 h-3 rounded-full ${doctor.available ? "bg-green-500" : "bg-red-500"
                      } mr-2`}
                  ></span>
                  <span className="text-gray-700">
                    {doctor.available ? "Available" : "Not Available"}
                  </span>
                </div>

                {/* Book Appointment Button */}
                {doctor.available && (
                  <button onClick={() => { navigate(`/appointment/${doctor._id}`); window.scrollTo(0, 0) }} className="mt-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-600 transition-all">
                    Book Appointment
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MentalHealthAssessment;
