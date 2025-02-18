import React, { useState } from "react";
import {
  FaUser,
  FaMale,
  FaFemale,
  FaBrain,
  FaBriefcase,
  FaHeart, // Added FaHeart import
} from "react-icons/fa";

const questions = [
  "Do you feel nervous?",
  "Do you have trouble sleeping?",
  "Do you feel fatigued often?",
  "Do you experience mood swings?",
  "Do you feel isolated from others?",
  "Do you have trouble concentrating?",
  "Do you feel hopeless frequently?",
  "Do you experience frequent headaches?",
  "Do you feel overwhelmed with daily tasks?",
  "Do you find it difficult to relax?",
  "Do you experience panic attacks?",
  "Do you feel persistently sad?",
];

const MentalHealthAssessment = () => {
  const [formData, setFormData] = useState({
    age: "",
    gender: "",
    employmentStatus: "",
    familyHistory: "", // Added the familyHistory field
    responses: Array(12).fill(""), // Initializing responses array
  });

  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleResponseChange = (index, value) => {
    const updatedResponses = [...formData.responses];
    updatedResponses[index] = value;
    setFormData({ ...formData, responses: updatedResponses });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if all required fields are filled
    if (!formData.age || !formData.gender || !formData.employmentStatus || !formData.familyHistory) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:5000/mental-predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          age: formData.age,
          gender: formData.gender,
          employment_status: formData.employmentStatus,  // Changed to match backend
          family_history: formData.familyHistory,  // Also match family history if needed
          responses: formData.responses,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setResult(data.prediction); // Update result with the prediction
      } else {
        console.error("Error:", data.error || "Something went wrong");
      }
    } catch (err) {
      console.error("Failed to connect to the server", err);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-full max-w-4xl bg-white p-8 rounded-lg shadow-xl">
        <h1 className="text-3xl font-semibold text-center text-blue-600 mb-6">
          Mental Health Assessment
        </h1>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 overflow-auto max-h-screen"
        >
          <div className="flex items-center space-x-2">
            <FaUser className="text-blue-600" />
            <div>
              <label htmlFor="age" className="text-lg font-medium">
                Age:
              </label>
              <input
                type="number"
                id="age"
                name="age"
                value={formData.age}
                onChange={handleChange}
                min="0"
                required
                className="mt-2 p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <FaMale className="text-blue-600" />
            <div>
              <label htmlFor="gender" className="text-lg font-medium">
                Gender:
              </label>
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
                className="mt-2 p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <FaBriefcase className="text-blue-600" />
            <div>
              <label htmlFor="employmentStatus" className="text-lg font-medium">
                Employment Status:
              </label>
              <select
                id="employmentStatus"
                name="employmentStatus"
                value={formData.employmentStatus}
                onChange={handleChange}
                required
                className="mt-2 p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Employed">Employed</option>
                <option value="Unemployed">Unemployed</option>
                <option value="Student">Student</option>
                <option value="Retired">Retired</option>
              </select>
            </div>
          </div>

          {/* Added Family History Field */}
          <div className="flex items-center space-x-2">
            <FaHeart className="text-blue-600" />
            <div>
              <label htmlFor="familyHistory" className="text-lg font-medium">
                Family History of Mental Health:
              </label>
              <select
                id="familyHistory"
                name="familyHistory"
                value={formData.familyHistory}
                onChange={handleChange}
                required
                className="mt-2 p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
          </div>

          {questions.map((question, index) => (
            <div key={index} className="flex items-center space-x-2">
              <FaBrain className="text-blue-600" />
              <div>
                <label htmlFor={`response${index}`} className="text-lg font-medium">
                  {question}
                </label>
                <input
                  type="number"
                  id={`response${index}`}
                  name={`response${index}`}
                  value={formData.responses[index]}
                  onChange={(e) => handleResponseChange(index, e.target.value)}
                  min="1"
                  max="5"
                  required
                  className="mt-2 p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          ))}

          <button
            type="submit"
            className="col-span-2 mt-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Submit
          </button>
        </form>

        {result && (
          <div className="mt-6 p-4 bg-green-100 border border-green-400 rounded-md">
            <h2 className="text-lg font-semibold text-green-700">Prediction Result:</h2>
            <pre className="text-green-700">{JSON.stringify(result, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default MentalHealthAssessment;
