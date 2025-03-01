import { useContext, useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { assets } from "../assets/assets";
import { skindata } from "../data/skindiseaseData"
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const SkinDiseaseDetector = () => {
  const [file, setFile] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);

    const { doctors } = useContext(AppContext)

    const navigate = useNavigate()
  

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

      const predictedDisease = skindata.find(disease => disease.name.toLowerCase() === data.prediction.toLowerCase());

      if (response.ok) {
        setPrediction({
          name: predictedDisease.name,
          info: predictedDisease.overview,
          prescription: predictedDisease.prescription,
          doctors: doctors.filter(doc => doc.speciality.toLowerCase() == data.prediction.toLowerCase())
        });
      } else {
        alert(`Error: ${data.error}`);
      }
    } catch (error) {
      alert("Failed to connect to the server. Please try again.", error);
    } finally {
      setLoading(false);
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
              ⚠️ This is only an ML prediction and may not be 100% accurate.
              Please consult a doctor for professional medical advice.
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
