import { useState } from "react";
import {
  FaNotesMedical,
  FaPills,
  FaSyringe,
  FaHeartbeat,
  FaUserMd,
} from "react-icons/fa";

const SymptomAnalysis = () => {
  const [symptoms, setSymptoms] = useState(["", "", "", "", ""]);
  const [prediction, setPrediction] = useState(null); // To store prediction result

  const handleChange = (index, value) => {
    const newSymptoms = [...symptoms];
    newSymptoms[index] = value;
    setSymptoms(newSymptoms);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Predicting disease for:", symptoms);

    // Simulating prediction (you can replace this with actual API call)
    const simulatedPrediction = {
      name: "Flu",
      info: "A contagious respiratory illness caused by influenza viruses.",
      doctors: [
        {
          _id: "1",
          name: "Dr. Smith",
          image: "doctor1.jpg",
          speciality: "General Physician",
          available: true,
        },
        {
          _id: "2",
          name: "Dr. Johnson",
          image: "doctor2.jpg",
          speciality: "Pulmonologist",
          available: false,
        },
      ],
    };
    setPrediction(simulatedPrediction);
  };

  return (
    <div className="px-6 md:px-12 lg:px-24 min-h-screen">
      {/* Symptom Analysis Section */}
      <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
          Disease Prediction Based on Symptoms
        </h2>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {symptoms.map((symptom, index) => {
            let icon;
            switch (index) {
              case 0:
                icon = <FaNotesMedical className="text-blue-600 text-2xl" />;
                break;
              case 1:
                icon = <FaHeartbeat className="text-red-600 text-2xl" />;
                break;
              case 2:
                icon = <FaPills className="text-green-600 text-2xl" />;
                break;
              case 3:
                icon = <FaSyringe className="text-yellow-600 text-2xl" />;
                break;
              case 4:
                icon = <FaUserMd className="text-purple-600 text-2xl" />;
                break;
              default:
                icon = <FaNotesMedical className="text-blue-600 text-2xl" />;
            }

            return (
              <div key={index} className="flex items-center space-x-4">
                <div className="flex-shrink-0">{icon}</div>
                <div className="w-full">
                  <label
                    className="text-gray-700 font-medium mb-2 block"
                    htmlFor={`symptom-${index}`}
                  >
                    {`Symptom ${index + 1}:`}
                  </label>
                  <input
                    id={`symptom-${index}`}
                    type="text"
                    value={symptom}
                    onChange={(e) => handleChange(index, e.target.value)}
                    className="p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                    placeholder={`Enter symptom ${index + 1}`}
                  />
                </div>
              </div>
            );
          })}
          <div className="flex justify-center mt-6">
            <button
              type="submit"
              className="w-2/3 py-3 bg-blue-600 text-white font-semibold rounded-full shadow-lg hover:bg-blue-700 hover:shadow-xl transition-all duration-300"
            >
              Predict
            </button>
          </div>
        </form>
      </div>

      {/* Prediction Result Section */}
      {prediction && (
        <div className="mt-12 w-full max-w-4xl mx-auto text-gray-800">
          <div className="text-center">
            <h2 className="text-3xl font-semibold text-gray-800 mb-3">
              Predicted <span className="text-blue-600">Result</span>
            </h2>
            <p className="text-gray-600 text-lg">
              Based on the symptoms provided, our ML model has predicted the
              following possible condition.
            </p>

            <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-3 mt-4 rounded-md">
              ⚠️ This is only an ML prediction and may not be 100% accurate.
              Please consult a doctor for professional medical advice.
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg mt-4">
            <h4 className="text-2xl font-semibold text-center mb-4">
              <span className="text-blue-600">Disease</span> Details
            </h4>

            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="w-full md:w-1/3 flex justify-center">
                <img
                  className="w-[220px] h-[220px] object-contain rounded-lg shadow-md"
                  src={prediction.image || "default-image.jpg"}
                  alt={prediction.name}
                />
              </div>

              <div className="w-full md:w-2/3 text-gray-700 space-y-4">
                <h5 className="text-xl font-semibold text-blue-600">
                  Disease Name:{" "}
                  <span className="text-gray-800">{prediction.name}</span>
                </h5>

                <h5 className="text-xl font-semibold text-blue-600">
                  Medical Overview:
                </h5>
                <p className="text-gray-600">{prediction.info}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg mt-12">
            <h4 className="text-2xl font-semibold text-center mb-6">
              Suggested <span className="text-blue-600">Doctors</span>
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
              {prediction.doctors.map((doctor) => (
                <div
                  key={doctor._id}
                  className="bg-gray-100 p-4 rounded-lg shadow-md flex flex-col items-center"
                >
                  <img
                    className="w-[120px] h-[120px] object-cover rounded-full shadow-md"
                    src={doctor.image || "default-doctor.jpg"}
                    alt={doctor.name}
                  />
                  <h5 className="text-lg font-semibold mt-3">{doctor.name}</h5>
                  <p className="text-gray-600">{doctor.speciality}</p>

                  <div className="flex items-center mt-2">
                    <span
                      className={`w-3 h-3 rounded-full ${
                        doctor.available ? "bg-green-500" : "bg-red-500"
                      } mr-2`}
                    ></span>
                    <span className="text-gray-700">
                      {doctor.available ? "Available" : "Not Available"}
                    </span>
                  </div>

                  {doctor.available && (
                    <button className="mt-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-600 transition-all">
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

export default SymptomAnalysis;
