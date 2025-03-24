import React, { useState } from "react";
import axios from "axios";
import { diseaseInfo, symptomsList } from "../data/data";
import { assets } from "../assets/assets";

const SymptomAnalysis = () => {
  const [symptoms, setSymptoms] = useState(["", "", "", "", ""]);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [name, setName] = useState("");

  const handleChange = (index, value) => {
    const updatedSymptoms = [...symptoms];
    updatedSymptoms[index] = value;
    setSymptoms(updatedSymptoms);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name) {
      setError("Name is required.");
      return;
    }
    if (symptoms.every((symptom) => !symptom)) {
      setError("Please select at least one symptom.");
      return;
    }

    setLoading(true);
    setError(null);

    const formData = new FormData();
    symptoms.forEach((symptom, index) => {
      formData.append(`Symptom${index + 1}`, symptom);
    });

    try {
      console.log("Submitting symptoms:", symptoms);
      const response = await axios.post(
        "http://127.0.0.1:5000/symptoms-predict",
        formData
      );
      const disease = response.data["Most Accurate Disease"];
      setPrediction(diseaseInfo[disease]);
    } catch (error) {
      console.error(
        "Error predicting disease:",
        error.response ? error.response.data : error.message
      );
      setError("Failed to predict. Ensure the backend is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      {/* Form Section */}
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">
          Symptom <span className="text-primary">Predictor</span>
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="col-span-1 sm:col-span-2">
              <label className="block font-medium mb-1">
                Your Name (required)
              </label>
              <input
                type="text"
                className="w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            {[...Array(5)].map((_, i) => (
              <div key={i} className="w-full">
                <label className="block font-medium mb-1">
                  Symptom {i + 1}
                </label>
                <select
                  className="w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  value={symptoms[i]}
                  onChange={(e) => handleChange(i, e.target.value)}
                >
                  <option value="">Select a symptom</option>
                  {symptomsList.map((symptom, index) => (
                    <option key={index} value={symptom}>
                      {symptom.replace(/_/g, " ")}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg shadow-lg hover:bg-blue-700 transition-all duration-300 mt-6"
          >
            {loading ? "Predicting..." : "Predict Disease"}
          </button>
        </form>
        {error && <p className="text-red-500 mt-4">{error}</p>}
      </div>

      {/* Prediction Result Section */}
      {prediction && (
        <div className="mt-16 bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-semibold text-center mb-6">
            Predicted <span className="text-primary"> Result </span>
          </h2>
          <p className="text-gray-600 text-lg text-center mb-6">
            Based on the symptoms provided, our ML model has predicted the
            following possible condition.
          </p>
          <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded-md text-center">
            ⚠️ This is only an ML prediction and may not be 100% accurate.
            Please consult a doctor for professional medical advice.
          </div>
          <div className="mt-12 flex flex-col md:flex-row items-center gap-8">
            <div className="w-full md:w-1/3 flex justify-center">
              <img
                className="w-[220px] h-[220px] object-contain rounded-lg shadow-md"
                src={assets.predict_result}
                alt={prediction.name}
              />
            </div>
            <div className="w-full md:w-2/3 text-gray-700 space-y-6">
              <h5 className="text-xl font-semibold text-primary">
                Disease Name:{" "}
                <span className="text-gray-800 ml-2">{prediction.name}</span>
              </h5>
              <h5 className="text-xl font-semibold text-primary">
                Medical Overview:
              </h5>
              <p className="text-gray-600">{prediction.description}</p>
              <h5 className="text-xl font-semibold text-primary">Treatment:</h5>
              <p className="text-gray-600">{prediction.treatment}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SymptomAnalysis;
