import React, { useState } from "react";
import axios from "axios"; // Axios for making API requests

const NutritionCheck = () => {
  const [symptoms, setSymptoms] = useState(Array(6).fill(""));
  const [loadingRemedies, setLoadingRemedies] = useState(false);
  const [deficiencyInfo, setDeficiencyInfo] = useState(null);
  const [error, setError] = useState(null);
  const [foodHerbImages, setFoodHerbImages] = useState({});
  const [GEMINI_API_KEY, setGEMINI_API_KEY] = useState("AIzaSyBcTNHUHz6DHIULzqGcDFXRxp0ZXPXxeCw"); 
  const [API_KEY_PIXABAY, setAPI_KEY_PIXABAY] = useState("49856975-b50f4f2288e42fd6f79dc9c5d"); 

  const predefinedSymptoms = [
    "Hair fall", "Brittle nails", "Fatigue", "Dry skin", "Weak immunity",
    "Muscle cramps", "Pale skin", "Irritability", "Poor concentration", "Cracks at mouth corners",
    "Dandruff", "Bone pain", "Frequent infections", "Bleeding gums", "Swollen tongue",
    "Night blindness", "Poor wound healing", "Depression", "Anemia", "Numbness or tingling"
  ];

  const handleChange = (index, value) => {
    const updatedSymptoms = [...symptoms];
    updatedSymptoms[index] = value;
    setSymptoms(updatedSymptoms);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    const selectedSymptoms = symptoms.filter((s) => s.trim() !== "");

    if (selectedSymptoms.length === 0) {
      setError("Please select at least one symptom.");
      return;
    }

    const symptomText = selectedSymptoms.join(", "); // Combine symptoms into a string

    // Fetch deficiencies related to the symptoms
    const deficiencyData = await fetchDeficiencyInfo(symptomText);
    if (deficiencyData) {
      setDeficiencyInfo(deficiencyData);
    }
  };

  // Fetching deficiency information based on symptoms
  const fetchDeficiencyInfo = async (symptomsText) => {
    setLoadingRemedies(true);
    const prompt = `You are an expert nutritionist. Based on the following symptoms, list the most likely nutrient deficiencies. Include details about the deficiency and suggest specific herbs or foods that will help reduce these deficiencies.
    
    Symptoms: ${symptomsText}
    
    Return the output in clean and strictly formatted JSON. Format:
    {
      "deficiencies": [
        {
          "deficiency": "Nutrient Name",
          "foods_herbs": [
            {
              "name": "Herb or Food Name",
              "type": "Herb or Food",
              "description": "2-line description of the herb or food",
              "benefits": "2-line benefit summary",
              "use": "2-line usage instruction",
              "keyword": "search keyword"
            }
          ]
        }
      ]
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

      setFoodHerbImages(await fetchFoodHerbImages(json.deficiencies));  // Fetch images for foods/herbs
      return json;
    } catch (err) {
      console.error("Error fetching deficiency info:", err);
      setError("Failed to fetch deficiency information.");
      return null;
    } finally {
      setLoadingRemedies(false);
    }
  };

  // Fetch images for foods/herbs
  const fetchFoodHerbImages = async (deficiencies) => {
    const images = {};
    for (const deficiency of deficiencies) {
      for (const foodOrHerb of deficiency.foods_herbs) {
        try {
          const res = await axios.get(
            `https://pixabay.com/api/?key=${API_KEY_PIXABAY}&q=${encodeURIComponent(foodOrHerb.keyword)}&image_type=photo&per_page=3&safesearch=true`
          );
          images[foodOrHerb.name] = res.data.hits[0]?.webformatURL || assets.defaultFoodHerbImage;
        } catch {
          images[foodOrHerb.name] = assets.defaultFoodHerbImage;
        }
      }
    }
    return images;
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-center">
        Nutrient <span className="text-primary">Deficiency Checker</span>
      </h2>

      {/* Symptoms Input Form */}
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {symptoms.map((symptom, i) => (
            <div key={i}>
              <label className="block font-medium mb-1">Symptom {i + 1}</label>
              <select
                className="w-full p-3 border rounded-lg"
                value={symptom}
                onChange={(e) => handleChange(i, e.target.value)}
              >
                <option value="">-- Select a symptom --</option>
                {predefinedSymptoms.map((sym, idx) => (
                  <option key={idx} value={sym}>
                    {sym}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg mt-6 hover:bg-blue-700"
        >
          Analyze Deficiency
        </button>

        {error && <p className="text-red-600 mt-4 text-center">{error}</p>}
      </form>

      {/* Nutrient Deficiency Info */}
      {loadingRemedies ? (
        <div className="mt-16 text-center">
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-green-600 border-solid"></div>
          </div>
          <p className="text-green-600 mt-4">Loading Nutrient Deficiency Information...</p>
        </div>
      ) : deficiencyInfo && (
        <div className="mt-16 bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold text-center mb-10">
            <span className="text-green-600">Deficiency</span> Information
          </h2>

          {/* Deficiency Details */}
          {deficiencyInfo.deficiencies.map((deficiency, index) => (
            <div key={index} className="mb-8">
              <h3 className="text-xl font-semibold text-green-700 mb-3">{deficiency.deficiency}</h3>

              {/* Food/Herb Recommendations */}
              <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-6">
                {deficiency.foods_herbs.map((item, idx) => (
                  <div key={idx} className="bg-green-50 p-6 rounded-2xl shadow-md">
                    <img
                      src={foodHerbImages[item.name] || assets.defaultFoodHerbImage}
                      alt={item.name}
                      className="w-full h-[180px] object-cover rounded-xl mb-4"
                    />
                    <h4 className="text-lg font-semibold text-green-700 mb-1">{item.name}</h4>
                    <p className="text-sm text-gray-500 italic mb-2">
                      <strong>Type:</strong> {item.type}
                    </p>
                    <p className="text-sm text-gray-500">{item.description}</p>
                    <p className="text-sm text-gray-500">Benefits: {item.benefits}</p>
                    <p className="text-sm text-gray-500">Use: {item.use}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NutritionCheck;
