import React, { useState } from "react";
import axios from "axios";

const symptomsList = [
  "back_pain", "constipation", "abdominal_pain", "diarrhoea", "mild_fever",
  "yellow_urine", "yellowing_of_eyes", "acute_liver_failure", "fluid_overload",
  "swelling_of_stomach", "swelled_lymph_nodes", "malaise", "blurred_and_distorted_vision",
  "phlegm", "throat_irritation", "redness_of_eyes", "sinus_pressure", "runny_nose",
  "congestion", "chest_pain", "weakness_in_limbs", "fast_heart_rate", "pain_during_bowel_movements",
  "pain_in_anal_region", "bloody_stool", "irritation_in_anus", "neck_pain", "dizziness",
  "cramps", "bruising", "obesity", "swollen_legs", "swollen_blood_vessels", "puffy_face_and_eyes",
  "enlarged_thyroid", "brittle_nails", "swollen_extremeties", "excessive_hunger",
  "extra_marital_contacts", "drying_and_tingling_lips", "slurred_speech", "knee_pain",
  "hip_joint_pain", "muscle_weakness", "stiff_neck", "swelling_joints", "movement_stiffness",
  "spinning_movements", "loss_of_balance", "unsteadiness", "weakness_of_one_body_side",
  "loss_of_smell", "bladder_discomfort", "foul_smell_of urine", "continuous_feel_of_urine",
  "passage_of_gases", "internal_itching", "toxic_look_(typhos)", "depression", "irritability",
  "muscle_pain", "altered_sensorium", "red_spots_over_body", "belly_pain", "abnormal_menstruation",
  "dischromic _patches", "watering_from_eyes", "increased_appetite", "polyuria",
  "family_history", "mucoid_sputum", "rusty_sputum", "lack_of_concentration", "visual_disturbances",
  "receiving_blood_transfusion", "receiving_unsterile_injections", "coma", "stomach_bleeding",
  "distention_of_abdomen", "history_of_alcohol_consumption", "fluid_overload", "blood_in_sputum",
  "prominent_veins_on_calf", "palpitations", "painful_walking", "pus_filled_pimples", "blackheads",
  "scurring", "skin_peeling", "silver_like_dusting", "small_dents_in_nails", "inflammatory_nails",
  "blister", "red_sore_around_nose", "yellow_crust_ooze"
];

const SymptomAnalysis = () => {
  const [symptoms, setSymptoms] = useState(["", "", "", "", ""]);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (index, value) => {
    const updatedSymptoms = [...symptoms];
    updatedSymptoms[index] = value;
    setSymptoms(updatedSymptoms);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData();
    symptoms.forEach((symptom, index) => {
      formData.append(`Symptom${index + 1}`, symptom);
    });

    try {
      const response = await axios.post("http://127.0.0.1:5000/symptoms-predict", formData);
      setPrediction(response.data["Most Accurate Disease"]);
    } catch (error) {
      console.error("Error predicting disease:", error);
      setError("Failed to predict. Ensure the backend is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-xl shadow-lg">
      <h2 className="text-xl font-bold mb-4">Symptom Predictor</h2>
      <form onSubmit={handleSubmit}>
        {[...Array(5)].map((_, i) => (
          <div key={i} className="mb-3">
            <label className="block font-medium">Symptom {i + 1}</label>
            <select
              className="w-full p-2 border rounded"
              value={symptoms[i]}
              onChange={(e) => handleChange(i, e.target.value)}
            >
              <option value="">Select a symptom</option>
              {symptomsList.map((symptom, index) => (
                <option key={index} value={symptom}>{symptom.replace(/_/g, " ")}</option>
              ))}
            </select>
          </div>
        ))}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          {loading ? "Predicting..." : "Predict Disease"}
        </button>
      </form>
      {error && <p className="text-red-500 mt-4">{error}</p>}
      {prediction && (
        <div className="mt-4 p-3 bg-green-100 rounded">
          <p className="font-semibold">Predicted Disease:</p>
          <p className="text-lg text-green-700">{prediction}</p>
        </div>
      )}
    </div>
  );
};

export default SymptomAnalysis;
