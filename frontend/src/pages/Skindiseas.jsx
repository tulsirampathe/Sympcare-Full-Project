import { useState } from "react";

export default function SkinDiseaseDetector() {
  const [diseaseName, setDiseaseName] = useState("");
  const [files, setFiles] = useState({ register: [], predict: null });

  const handleFileChange = (e, type) => {
    if (type === "register") {
      setFiles({ ...files, register: [...files.register, e.target.files[0]] });
    } else {
      setFiles({ ...files, predict: e.target.files[0] });
    }
  };

  const handleRegisterDisease = () => {
    console.log("Registering Disease: ", diseaseName, files.register);
  };

  const handleTrainModel = () => {
    console.log("Training model...");
  };

  const handlePredictDisease = () => {
    console.log("Predicting disease with file: ", files.predict);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-8">
      <h1 className="text-3xl font-bold mb-6">Skin Disease Detector</h1>
      
      <div className="bg-white p-6 rounded-lg shadow-lg w-2/3 mb-6">
        <h2 className="text-xl font-semibold mb-4">Register Disease</h2>
        <input
          type="text"
          placeholder="Disease Name"
          className="border p-2 w-full mb-2"
          value={diseaseName}
          onChange={(e) => setDiseaseName(e.target.value)}
        />
        <input type="file" onChange={(e) => handleFileChange(e, "register")} className="mb-2" />
        <button onClick={handleRegisterDisease} className="bg-blue-500 text-white p-2 rounded-lg w-full">
          Register Disease
        </button>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg w-2/3 mb-6">
        <h2 className="text-xl font-semibold mb-4">Train Model</h2>
        <button onClick={handleTrainModel} className="bg-green-500 text-white p-2 rounded-lg w-full">
          Train Model
        </button>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg w-2/3">
        <h2 className="text-xl font-semibold mb-4">Predict Disease</h2>
        <input type="file" onChange={(e) => handleFileChange(e, "predict")} className="mb-2" />
        <button onClick={handlePredictDisease} className="bg-red-500 text-white p-2 rounded-lg w-full">
          Predict Disease
        </button>
      </div>
    </div>
  );
}
