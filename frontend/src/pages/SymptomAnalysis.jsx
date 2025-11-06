import axios from "axios";
import React, { useState } from "react";
import { assets } from "../assets/assets";
import { diseaseInfo, symptomsList, ndiseaseInfo, newsymptomsList } from "../data/data";


const API_KEY_PIXABAY = "49856975-b50f4f2288e42fd6f79dc9c5d";
const GEMINI_API_KEY = "AIzaSyBadJ5jdznsttPKQLyrDzZTEbSNvKzTt4U";


const SymptomAnalysis = () => {
  const [symptoms, setSymptoms] = useState(["", "", "", "", ""]);
  const [name, setName] = useState("");
  const [prediction, setPrediction] = useState(null);
  const [ayurvedicTreatment, setAyurvedicTreatment] = useState(null);
  const [herbImages, setHerbImages] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [loadingRemedies, setLoadingRemedies] = useState(false);
  const [centers, setCenters] = useState([]);
  const [loadingCenters, setLoadingCenters] = useState(false);
  const [location, setLocation] = useState(null);

  const handleChange = (index, value) => {
    const updatedSymptoms = [...symptoms];
    updatedSymptoms[index] = value;
    setSymptoms(updatedSymptoms);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setPrediction(null);
    setAyurvedicTreatment(null);
    if (!name || symptoms.every((s) => !s)) {
      return setError("Please fill your name and at least one symptom.");
    }

    setLoading(true);
    try {
      const response = await axios.post("http://127.0.0.1:5000/symptoms-predict", {
        name,
        symptoms,
      });

      const predictedDisease = response.data["Most Accurate Disease"];
      const diseaseDetails = ndiseaseInfo[predictedDisease];
      setPrediction(diseaseDetails);
      getLocationAndFetch();
    } catch (err) {
      console.error(err);
      setError("Prediction failed. Make sure the backend and API keys are working.");
    } finally {
      setLoading(false);
    }
  };


  const getLocationAndFetch = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    setLoadingCenters(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        setLocation({ lat, lon });
        fetchCentersFromBackend(lat, lon);
      },
      (error) => {
        console.error("Error getting location:", error);
        alert("Unable to retrieve your location.");
        setLoadingCenters(false);
      }
    );
  };

  const fetchCentersFromBackend = async (lat, lon) => {
    try {
      const response = await axios.get("http://localhost:5000/fetchAyurvedicCenters", {
        params: { lat, lon },
      });

      const formatted = response.data.map((item) => ({
        name: item.name,
        address: item.address,
        distance: item.distance,
      }));

      setCenters(formatted);
    } catch (error) {
      console.error("Error fetching centers from backend:", error);
      alert("Something went wrong while fetching Ayurvedic centers.");
    } finally {
      setLoadingCenters(false);
    }
  };



  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Form */}
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center mb-6">
          Symptom <span className="text-primary">Predictor</span>
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="block font-medium mb-1">Your Name</label>
              <input
                type="text"
                className="w-full p-3 border rounded-lg"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            {symptoms.map((symptom, i) => (
              <div key={i}>
                <label className="block font-medium mb-1">Symptom {i + 1}</label>
                <select
                  className="w-full p-3 border rounded-lg"
                  value={symptom}
                  onChange={(e) => handleChange(i, e.target.value)}
                >
                  <option value="">Select a symptom</option>
                  {newsymptomsList.map((s, idx) => (
                    <option key={idx} value={s}>
                      {s.replace(/_/g, " ")}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>
          <button className="w-full bg-blue-600 text-white py-3 rounded-lg mt-6 hover:bg-blue-700">
            {loading ? "Predicting..." : "Predict Disease"}
          </button>
        </form>
        {error && <p className="text-red-600 mt-4 text-center">{error}</p>}
      </div>

      {/* Disease Result */}
      {prediction && (
        <div className="mt-16 bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-semibold text-center mb-4">
            Predicted <span className="text-primary"> Result </span>
          </h2>
          <p className="text-gray-600 text-lg text-center mb-2">
            Based on the symptoms provided, our ML model has predicted the
            following possible condition.
          </p>
          <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded-md text-center">
            ⚠️ This is an AI and an ML prediction and may not be 100% accurate. Please consult a doctor for final confirmation.
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



      {location && (
        <div className="mt-6 p-4 bg-blue-100 rounded shadow">
          {loadingCenters && <p>Loading centers...</p>}
          {!loadingCenters && centers.length > 0 && (

            <div className="mt-12 bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold mb-4 text-center">
                Nearby Ayurvedic Centers
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                {centers.map((center, idx) => (
                  <div
                    key={idx}
                    className="p-4 border rounded-lg hover:shadow-md transition duration-200 bg-gray-50"
                  >
                    <h4 className="text-lg font-bold text-blue-700">{center.name}</h4>
                    <p className="text-sm text-gray-600">{center.address}</p>
                    <button
                      onClick={() =>
                        window.open(
                          `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                            center.name
                          )}`,
                          "_blank"
                        )
                      }
                      className="mt-3 inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                      View on Google Maps
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {!loadingCenters && centers.length === 0 && <p>No Ayurvedic centers found nearby.</p>}
        </div>
      )}
    </div>
  );
};

export default SymptomAnalysis;