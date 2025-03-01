import React, { useState } from "react";
import {
  FaUser,
  FaMale,
  FaFemale,
  FaBrain,
  FaBriefcase,
  FaHeart,
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

const symptomsData = {
  Anxiety: {
    image: "./Anxiety.jpg",
    description:
      "Anxiety is characterized by excessive worry, nervousness, and tension.",
    treatment:
      "Treatment includes therapy, meditation, relaxation techniques, and medication.",
  },
  Depression: {
    image: "./Depression.jpg",
    description:
      "Depression involves persistent sadness, loss of interest, and fatigue.",
    treatment:
      "Treatment includes counseling, lifestyle changes, and antidepressants.",
  },
  Insomnia: {
    image: "./Insomnia.jpg",
    description: "Insomnia is the difficulty in falling or staying asleep.",
    treatment:
      "Treatment includes sleep therapy, avoiding caffeine, and improving sleep hygiene.",
  },
  Phobia: {
    image: "./Phobia.jpg",
    description:
      "A phobia is an extreme fear of a specific object, place, or situation.",
    treatment:
      "Treatment includes cognitive behavioral therapy (CBT) and exposure therapy.",
  },
  Schizophrenia: {
    image: "./Schizophrenia.jpg",
    description:
      "Schizophrenia involves delusions, hallucinations, and disorganized thinking.",
    treatment: "Treatment includes antipsychotic medication and therapy.",
  },
};

const MentalHealthAssessment = () => {
  const [formData, setFormData] = useState({
    age: "",
    gender: "",
    employment_status: "",
    family_history: "",
    responses: Array(12).fill(""),
  });

  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleResponseChange = (index, value) => {
    const updatedResponses = [...formData.responses];
    updatedResponses[index] = value;
    setFormData({ ...formData, responses: updatedResponses });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.age ||
      !formData.gender ||
      !formData.employment_status ||
      !formData.family_history
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:5000/mental-predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        setResult(data.prediction);
      } else {
        console.error("Error:", data.error || "Something went wrong");
      }
    } catch (err) {
      console.error("Failed to connect to the server", err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-6">
      <div className="w-full max-w-4xl bg-white p-6 md:p-8 rounded-lg shadow-xl">
        <h1 className="text-2xl md:text-3xl font-semibold text-center mb-4 md:mb-6">
          <span className="text-primary">Mental Health</span> Assessment
        </h1>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {/* Age Field */}
          <div className="flex items-center space-x-2">
            <FaUser className="text-blue-600" />
            <div className="w-full">
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
                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Gender Field */}
          <div className="flex items-center space-x-2">
            <FaMale className="text-blue-600" />
            <div className="w-full">
              <label htmlFor="gender" className="text-lg font-medium">
                Gender:
              </label>
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          {/* Employment Status */}
          <div className="flex items-center space-x-2">
            <FaBriefcase className="text-blue-600" />
            <div className="w-full">
              <label htmlFor="employment_status" className="text-lg font-medium">
                Employment Status:
              </label>
              <select
                id="employment_status"
                name="employment_status"
                value={formData.employment_status}
                onChange={handleChange}
                required
                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select</option>
                <option value="Employed">Employed</option>
                <option value="Unemployed">Unemployed</option>
                <option value="Student">Student</option>
                <option value="Retired">Retired</option>
              </select>
            </div>
          </div>

          {/* Family History Field */}
          <div className="flex items-center space-x-2">
            <FaHeart className="text-blue-600" />
            <div className="w-full">
              <label htmlFor="family_history" className="text-lg font-medium">
                Family History of Mental Health:
              </label>
              <select
                id="family_history"
                name="family_history"
                value={formData.family_history}
                onChange={handleChange}
                required
                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
          </div>

          {/* Scrollable Question Section */}
          <div className="md:col-span-2 mt-4">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">
              Answer the following questions (Scale: 1 - Never, 5 - Always)
            </h2>
            <div className="max-h-80 overflow-y-auto p-2 border rounded-md bg-gray-50">
              {questions.map((question, index) => (
                <div key={index} className="flex items-center space-x-2 mb-2">
                  <FaBrain className="text-blue-600" />
                  <div className="w-full">
                    <label
                      htmlFor={`response${index}`}
                      className="text-sm font-medium"
                    >
                      {question}
                    </label>
                    <input
                      type="number"
                      id={`response${index}`}
                      name={`response${index}`}
                      value={formData.responses[index]}
                      onChange={(e) =>
                        handleResponseChange(index, e.target.value)
                      }
                      min="1"
                      max="5"
                      required
                      className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="md:col-span-2 w-full py-2 mt-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Submit
          </button>
        </form>

        
      </div>

      {/* Result Section */}
      {result && (
          <div className="w-full max-w-4xl bg-white p-6 mt-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-center mb-4">Prediction <span className="text-primary">Result</span></h2>
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border p-2">Symptom</th>
                  <th className="border p-2">Status</th>
                  <th className="border p-2">Description</th>
                  <th className="border p-2">Treatment</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(result).map(([symptom, hasSymptom]) => (
                  <tr key={symptom}>
                    <td className="border p-2 font-semibold">{symptom}</td>
                    <td className={`border p-2 font-bold ${hasSymptom ? "text-red-600" : "text-green-600"}`}>
                      {hasSymptom ? "Detected" : "Not Detected"}
                    </td>
                    <td className="border p-2">{symptomsData[symptom]?.description || "N/A"}</td>
                    <td className="border p-2">{hasSymptom ? symptomsData[symptom]?.treatment || "N/A" : "N/A"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
    </div>
  );
};

export default MentalHealthAssessment;
