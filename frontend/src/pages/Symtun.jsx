import { useState } from "react";

export default function DiseasePrediction() {
  const [symptoms, setSymptoms] = useState(["", "", "", "", ""]);

  const handleChange = (index, value) => {
    const newSymptoms = [...symptoms];
    newSymptoms[index] = value;
    setSymptoms(newSymptoms);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Predicting disease for:", symptoms);
    // Add API call or ML model integration here
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">
          Disease Prediction Based on Symptoms
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {symptoms.map((symptom, index) => (
            <input
              key={index}
              type="text"
              placeholder={`Symptom ${index + 1}`}
              value={symptom}
              onChange={(e) => handleChange(index, e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          ))}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Predict
          </button>
        </form>
      </div>
    </div>
  );
}
