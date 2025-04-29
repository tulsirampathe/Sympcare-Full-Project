import { useContext, useState } from "react";
import axios from "axios";
import { FaCloudUploadAlt } from "react-icons/fa";
import { assets } from "../assets/assets";
import { skindata } from "../data/skindiseaseData";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";


const API_KEY_PIXABAY = "49856975-b50f4f2288e42fd6f79dc9c5d";
const GEMINI_API_KEY = "AIzaSyBadJ5jdznsttPKQLyrDzZTEbSNvKzTt4U";

const SkinDiseaseDetector = () => {
  const [file, setFile] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingRemedies, setLoadingRemedies] = useState(false);
  const [ayurvedicTreatment, setAyurvedicTreatment] = useState(null);
  const [herbImages, setHerbImages] = useState({});
  const [error, setError] = useState(null);
  const [location, setLocation] = useState(null);
  const [loadingCenters, setLoadingCenters] = useState(false);
  const [centers, setCenters] = useState([]);

  const { doctors } = useContext(AppContext);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    if (e.dataTransfer.files.length > 0) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handlePredict = async () => {
    if (!file) return alert("Please upload an image first!");
    setLoading(true);

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch("http://127.0.0.1:5000/skin-predict", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      const predictedDisease = skindata.find(
        (disease) => disease.name.toLowerCase() === data.prediction.toLowerCase()
      );

      if (response.ok && predictedDisease) {
        setPrediction({
          name: predictedDisease.name,
          info: predictedDisease.overview,
          prescription: predictedDisease.prescription,
          doctors: doctors.filter(
            (doc) => doc.speciality.toLowerCase() === data.prediction.toLowerCase()
          ),
        });

        await fetchAyurvedicRemedies(predictedDisease.name);
        getLocationAndFetch();
      } else {
        alert(`Error: ${data.error || "Disease not found in dataset."}`);
      }
    } catch (error) {
      alert("Failed to connect to the server. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAyurvedicRemedies = async (diseaseName) => {
    setLoadingRemedies(true);
    const prompt = `You are an expert Ayurvedic doctor. Provide a concise and accurate Ayurvedic remedy and the making process of the remedy of this disease nmae as  : ${diseaseName}.
  
  Include the following in exactly 2–3 lines per item:
  1. At least 3 Ayurvedic herbs which are used for the remedy with:
     - name
     - botanical_name
     - description (2 lines max, accurate)
     - benefits (2 lines max)
     - use (2 lines on how to use)
     - keyword (for image search)
  
  2. Ayurvedic healing practices specific to the disease (2–3 lines)
  3. Diet and lifestyle suggestions (2–3 lines)
  
  Return the output in clean and strictly formatted JSON (no markdown, no extra text). Format:
  
  {
    "treatment": "Short general treatment advice (2 lines)",
    "healing_practices": "Text with Ayurvedic healing practices (2–3 lines)",
    "diet_lifestyle": "Text with diet and lifestyle tips (2–3 lines)",
    "herbs": [
      {
        "name": "Herb Name",
        "botanical_name": "Botanical Name",
        "description": "2-line accurate description",
        "benefits": "2-line benefit summary",
        "use": "2-line usage instruction",
        "keyword": "search keyword"
      }
    ]
  }
  `;

    try {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: { temperature: 0.7 },
          }),
        }
      );

      const data = await res.json();
      const responseText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      const cleanedText = responseText.replace(/```json|```/g, "").trim();
      const json = JSON.parse(cleanedText);

      setAyurvedicTreatment(json);
      fetchHerbImages(json.herbs);
      return json;
    } catch (err) {
      console.error("Error fetching Ayurvedic remedy:", err);
      setError("Failed to fetch Ayurvedic remedy.");
      return null;
    } finally {
      setLoadingRemedies(false);
    }
  };

  const fetchHerbImages = async (herbs) => {
    const images = {};
    for (const herb of herbs) {
      try {
        const res = await axios.get(
          `https://pixabay.com/api/?key=${API_KEY_PIXABAY}&q=${encodeURIComponent(herb.keyword)}&image_type=photo&per_page=3&safesearch=true`
        );
        images[herb.name] = res.data.hits[0]?.webformatURL || assets.defaultHerbImage;
      } catch {
        images[herb.name] = assets.defaultHerbImage;
      }
    }
    setHerbImages(images);
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
    <div className="px-6 md:px-12 lg:px-24 min-h-screen flex flex-col items-center">
      {/* Section Title */}
      <h2 className="text-3xl font-bold text-gray-800 text-center">
        Advanced <span className="text-primary">Skin Disease Detection</span>
      </h2>
      <p className="text-gray-600 text-center max-w-2xl mt-2">
        AI-powered skin analysis to detect potential dermatological conditions.
        Upload an image of the affected area, and our system will provide an
        assessment.
      </p>

      {/* Content Section */}
      <div className="mt-12 flex flex-col md:flex-row items-center gap-12 w-full max-w-4xl">
        {/* Image Section */}
        <div className="md:w-1/2 flex justify-center">
          <img
            className="w-full max-w-md rounded-lg shadow-xl bg-primary"
            src={file ? URL.createObjectURL(file) : assets.Skin_Disease_img}
            alt="Skin Disease Detection"
          />
        </div>

        {/* Drag & Drop Upload Section */}
        <div className="md:w-1/2 text-gray-700 space-y-6 text-center">
          <h3 className="text-2xl font-semibold text-gray-800">
            Upload an Image
          </h3>

          {/* Drag & Drop Area */}
          <div
            className={`border-2 border-dashed ${dragging ? "border-blue-500 bg-blue-50" : "border-gray-300"
              } rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer transition-all`}
            onClick={() => document.getElementById("fileUpload").click()} // Open file input
            onDragOver={(e) => {
              e.preventDefault();
              setDragging(true);
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={handleDrop}
          >
            <FaCloudUploadAlt className="text-4xl text-gray-500 mb-2" />
            <p className="text-gray-600">Drag & Drop an image here</p>
            <p className="text-sm text-gray-400">or click to select a file</p>
            <input
              type="file"
              className="hidden"
              id="fileUpload"
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>

          {/* Selected File Display */}
          {file && <p className="text-gray-600">Selected File: {file.name}</p>}

          {/* Predict Button */}
          <button
            className="bg-primary text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-600 transition-all disabled:opacity-50"
            onClick={handlePredict}
            disabled={loading}
          >
            {loading ? "Processing..." : "Predict Disease"}
          </button>
        </div>
      </div>

      {/* Prediction Result */}
      {prediction && (
        <div className="mt-12 w-full max-w-4xl text-gray-800">
          {/* Prediction Result Heading */}
          <div className="text-center">
            <h2 className="text-3xl font-semibold text-gray-800 mb-3">
              Predicted <span className="text-primary">Result</span>
            </h2>
            <p className="text-gray-600 text-lg">
              Based on the symptoms provided, our ML model has predicted the
              following possible condition.
            </p>

            {/* Alert Message */}
            <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-3 mt-4 rounded-md">
              ⚠️ This is an AI and an ML prediction and may not be 100% accurate. Please consult a doctor for final confirmation.
            </div>
          </div>

          {/* Disease Details Section */}
          <div className="bg-white p-6 rounded-lg shadow-lg mt-4">
            <h4 className="text-2xl font-semibold text-center mb-4">
              <span className="text-primary">Disease</span> Details
            </h4>

            <div className="flex flex-col md:flex-row items-center gap-6">
              {/* Disease Image (Left Side) */}
              <div className="w-full md:w-1/3 flex justify-center">
                <img
                  className="w-[220px] h-[220px] object-contain rounded-lg shadow-md"
                  src={assets.about_image}
                  alt={prediction.name}
                />
              </div>

              {/* Disease Information (Right Side) */}
              <div className="w-full md:w-2/3 text-gray-700 space-y-4">
                <h5 className="text-xl font-semibold text-primary">
                  Disease Name:{" "}
                  <span className="text-gray-800">{prediction.name}</span>
                </h5>

                <h5 className="text-xl font-semibold text-primary">
                  Information:
                </h5>
                <p className="text-gray-600">{prediction.info}</p>
                <h5 className="text-xl font-semibold text-primary">
                  Prescription:
                </h5>
                <p className="text-gray-600">{prediction.prescription}</p>
              </div>
            </div>
          </div>

        



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
                        <p className="text-sm text-green-600 mt-1">~ {center.distance / 1000} km away</p>
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



          {/* Suggested Doctors Section */}
          <div className="bg-white p-6 rounded-lg shadow-lg mt-12">
            <h4 className="text-2xl font-semibold text-center mb-6">
              Suggested <span className="text-primary">Doctors</span>
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
              {prediction.doctors.map((doctor) => (
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
                    <button onClick={() => { navigate(`/appointment/${doctor._id}`); scrollTo(0, 0) }} className="mt-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-600 transition-all">
                      Book Appointment
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SkinDiseaseDetector;
