import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { AppContext } from "../context/AppContext";


const Therapie = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { therapy } = location.state || {};

  const { doctors: doctorsData } = useContext(AppContext)

  const [remedyInfo, setRemedyInfo] = useState({ description: "", use: "" });
  const [loadingRemedies, setLoadingRemedies] = useState(false);
  const [centers, setCenters] = useState([]);
  const [loadingCenters, setLoadingCenters] = useState(false);
  const GEMINI_API_KEY = "AIzaSyBadJ5jdznsttPKQLyrDzZTEbSNvKzTt4U";

  const doctors = doctorsData.filter(doc => doc.speciality.toLowerCase() == therapy.name.toLowerCase())


  useEffect(() => {
    if (therapy?.title) {
      fetchAyurvedicRemedies(therapy.title);
    }
  }, [therapy]);

  const fetchAyurvedicRemedies = async (diseaseName) => {
    setLoadingRemedies(true);
    const prompt = `You are an expert Ayurvedic specialist. Give the following information in JSON format:
{
  "description": "A short, simple description of the disease ${therapy.title} in 50-100 words.",
  "use": "Mention briefly how Ayurveda helps in treating ${therapy.title}."
}`;

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

      setRemedyInfo(json);
      getLocationAndFetch();
    } catch (err) {
      console.error("Error fetching Ayurvedic remedy:", err);
    } finally {
      setLoadingRemedies(false);
    }
  };

  const getLocationAndFetch = () => {
    if (!navigator.geolocation) return alert("Geolocation not supported.");
    setLoadingCenters(true);

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        fetchCentersFromBackend(latitude, longitude);
      },
      (err) => {
        console.error(err);
        alert("Unable to get location.");
        setLoadingCenters(false);
      }
    );
  };

  const fetchCentersFromBackend = async (lat, lon) => {
    try {
      const response = await axios.get(`http://localhost:5000/fetchAyurvedicCenters`, {
        params: { lat, lon },
      });

      const formatted = response.data.map((item) => ({
        name: item.name,
        address: item.address,
        distance: item.distance,
      }));

      setCenters(formatted);
    } catch (error) {
      console.error("Error fetching centers:", error);
    } finally {
      setLoadingCenters(false);
    }
  };

  if (!therapy) {
    return (
      <div className="text-center mt-10">
        <h2 className="text-xl text-red-600">No therapy data provided.</h2>
        <button className="mt-4 px-4 py-2 bg-green-600 text-white rounded" onClick={() => navigate(-1)}>
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-green-800 text-center mb-6">{therapy.title}</h2>

      <img src={therapy.image} alt={therapy.title} className="w-full h-60 object-cover rounded mb-6" />

      {/* Static Use */}
      <p className="mt-4 text-emerald-700 font-medium">🌿 Use: {therapy.use}</p>

      {/* Gemini API Result */}
      {loadingRemedies ? (
        <p className="mt-6 text-center text-blue-500">Loading Ayurvedic information...</p>
      ) : (
        <div className="mt-4 bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold text-gray-800">📝 Description</h2>
          <p className="text-gray-700 mt-2">{remedyInfo.description}</p>

          <h2 className="text-xl font-semibold text-gray-800 mt-4">🌿 Ayurvedic Use</h2>
          <p className="text-gray-700 mt-2">{remedyInfo.use}</p>
        </div>
      )}

      {/* Suggested Doctors Section */}
        <div className="bg-white p-6 rounded-lg shadow-lg mt-12">
          <h4 className="text-2xl font-semibold text-center mb-6">
            Suggested <span className="text-primary">Doctors</span>
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {doctors.map((doctor) => (
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
      

      {/* Nearby Centers */}
      <div className="mt-12 bg-white p-6 rounded shadow-md">
        <h4 className="text-2xl font-semibold text-center mb-6">Nearby <span className="text-primary">Ayurvedic</span>  Centers</h4>
        {loadingCenters ? (
          <p className="text-center text-blue-500">Loading centers near you...</p>
        ) : (
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
        )}
      </div>

      <button
        onClick={() => navigate(-1)}
        className="mt-10 px-4 py-2 bg-lime-600 text-white rounded"
      >
        Back to List
      </button>
    </div>
  );
};

export default Therapie;
