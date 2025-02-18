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
  "loss_of_smell", "bladder_discomfort", "foul_smell_of_urine", "continuous_feel_of_urine",
  "passage_of_gases", "internal_itching", "toxic_look_(typhos)", "depression", "irritability",
  "muscle_pain", "altered_sensorium", "red_spots_over_body", "belly_pain", "abnormal_menstruation",
  "dischromic_patches", "watering_from_eyes", "increased_appetite", "polyuria",
  "family_history", "mucoid_sputum", "rusty_sputum", "lack_of_concentration", "visual_disturbances",
  "receiving_blood_transfusion", "receiving_unsterile_injections", "coma", "stomach_bleeding",
  "distention_of_abdomen", "history_of_alcohol_consumption", "fluid_overload", "blood_in_sputum",
  "prominent_veins_on_calf", "palpitations", "painful_walking", "pus_filled_pimples", "blackheads",
  "scurring", "skin_peeling", "silver_like_dusting", "small_dents_in_nails", "inflammatory_nails",
  "blister", "red_sore_around_nose", "yellow_crust_ooze"
];

const diseaseInfo = {
  "Fungal infection": {
    "title": "Fungal infection",
    "description": "Infections caused by fungi, commonly affecting skin, nails, or internal organs.",
    "treatment": "Antifungal medications."
  },
  "Allergy": {
    "title": "Allergy",
    "description": "A condition where the immune system reacts abnormally to a foreign substance.",
    "treatment": "Antihistamines, allergy shots."
  },
  "GERD": {
    "title": "GERD",
    "description": "Gastroesophageal reflux disease, a chronic digestive condition where stomach acid flows back into the esophagus.",
    "treatment": "Antacids, H2 blockers, proton pump inhibitors."
  },
  "Chronic cholestasis": {
    "title": "Chronic cholestasis",
    "description": "A condition where bile flow from the liver is reduced or stopped.",
    "treatment": "Bile acid medications, liver transplantation in severe cases."
  },
  "Drug Reaction": {
    "title": "Drug Reaction",
    "description": "An adverse reaction to medication, ranging from mild to severe.",
    "treatment": "Discontinue medication, antihistamines, steroids."
  },
  "Peptic ulcer disease": {
    "title": "Peptic ulcer disease",
    "description": "Ulcers that develop on the inner lining of the stomach or the upper part of the small intestine.",
    "treatment": "Proton pump inhibitors, antibiotics if caused by infection."
  },
  "AIDS": {
    "title": "AIDS",
    "description": "Acquired immunodeficiency syndrome, caused by HIV, where the immune system is severely weakened.",
    "treatment": "Antiretroviral therapy (ART)."
  },
  "Diabetes": {
    "title": "Diabetes",
    "description": "A group of diseases that affect the body's ability to regulate blood sugar levels.",
    "treatment": "Insulin, oral medications, lifestyle changes."
  },
  "Gastroenteritis": {
    "title": "Gastroenteritis",
    "description": "Inflammation of the stomach and intestines, usually caused by infection.",
    "treatment": "Hydration, anti-diarrheal medications, antibiotics if bacterial."
  },
  "Bronchial Asthma": {
    "title": "Bronchial Asthma",
    "description": "A chronic condition where the airways become inflamed and narrowed, making it difficult to breathe.",
    "treatment": "Inhalers, bronchodilators, corticosteroids."
  },
  "Hypertension": {
    "title": "Hypertension",
    "description": "High blood pressure, a condition where the force of the blood against artery walls is too high.",
    "treatment": "Antihypertensive medications, lifestyle changes."
  },
  "Migraine": {
    "title": "Migraine",
    "description": "A neurological condition characterized by severe headaches, often accompanied by nausea and sensitivity to light and sound.",
    "treatment": "Pain relief medications, triptans, lifestyle modifications."
  },
  "Cervical spondylosis": {
    "title": "Cervical spondylosis",
    "description": "Age-related wear and tear affecting the bones and discs in the neck (cervical spine).",
    "treatment": "Physical therapy, pain relievers, surgery if severe."
  },
  "Paralysis (brain hemorrhage)": {
    "title": "Paralysis (brain hemorrhage)",
    "description": "A condition where bleeding in the brain causes loss of muscle function or movement control.",
    "treatment": "Emergency care, surgery, rehabilitation therapy."
  },
  "Jaundice": {
    "title": "Jaundice",
    "description": "Yellowing of the skin and eyes due to high levels of bilirubin in the blood.",
    "treatment": "Treat underlying cause (liver disease, infection, etc.)."
  },
  "Malaria": {
    "title": "Malaria",
    "description": "A mosquito-borne infectious disease caused by Plasmodium parasites.",
    "treatment": "Antimalarial medications."
  },
  "Chicken pox": {
    "title": "Chicken pox",
    "description": "A highly contagious viral infection causing an itchy rash and flu-like symptoms.",
    "treatment": "Calamine lotion, antihistamines, antiviral medication in severe cases."
  },
  "Dengue": {
    "title": "Dengue",
    "description": "A viral infection transmitted by mosquitoes, causing severe flu-like symptoms.",
    "treatment": "Supportive care, hydration, pain relievers."
  },
  "Typhoid": {
    "title": "Typhoid",
    "description": "A bacterial infection caused by Salmonella typhi, affecting the intestines.",
    "treatment": "Antibiotics."
  },
  "Hepatitis A": {
    "title": "Hepatitis A",
    "description": "Liver infection caused by the Hepatitis A virus, typically spread through contaminated food and water.",
    "treatment": "Supportive care, vaccination for prevention."
  },
  "Hepatitis B": {
    "title": "Hepatitis B",
    "description": "A viral infection affecting the liver, transmitted through blood or bodily fluids.",
    "treatment": "Antiviral medications."
  },
  "Hepatitis C": {
    "title": "Hepatitis C",
    "description": "A viral infection causing liver inflammation, typically spread through blood.",
    "treatment": "Antiviral medications."
  },
  "Hepatitis D": {
    "title": "Hepatitis D",
    "description": "A liver infection caused by the Hepatitis D virus, only occurs in those infected with Hepatitis B.",
    "treatment": "Hepatitis B treatment, interferon therapy."
  },
  "Hepatitis E": {
    "title": "Hepatitis E",
    "description": "A viral liver disease caused by the Hepatitis E virus, usually spread through contaminated water.",
    "treatment": "Supportive care, hydration."
  },
  "Alcoholic hepatitis": {
    "title": "Alcoholic hepatitis",
    "description": "Liver inflammation caused by excessive alcohol consumption.",
    "treatment": "Abstinence from alcohol, medications, liver transplant if severe."
  },
  "Tuberculosis": {
    "title": "Tuberculosis",
    "description": "A contagious bacterial infection that primarily affects the lungs.",
    "treatment": "Antibiotic regimen for several months."
  },
  "Common Cold": {
    "title": "Common Cold",
    "description": "A viral infection affecting the upper respiratory tract.",
    "treatment": "Rest, hydration, over-the-counter cold medications."
  },
  "Pneumonia": {
    "title": "Pneumonia",
    "description": "Lung infection caused by bacteria, viruses, or fungi.",
    "treatment": "Antibiotics, antiviral drugs, supportive care."
  },
  "Dimorphic hemorrhoids (piles)": {
    "title": "Dimorphic hemorrhoids (piles)",
    "description": "Swollen veins in the rectum or anus.",
    "treatment": "Topical treatments, stool softeners, surgery if severe."
  },
  "Heart attack": {
    "title": "Heart attack",
    "description": "A medical emergency where blood flow to the heart is blocked.",
    "treatment": "Medications, surgery, lifestyle changes."
  },
  "Varicose veins": {
    "title": "Varicose veins",
    "description": "Enlarged, twisted veins, usually in the legs, caused by faulty valves.",
    "treatment": "Compression stockings, laser treatments, surgery."
  },
  "Hypothyroidism": {
    "title": "Hypothyroidism",
    "description": "A condition where the thyroid gland does not produce enough thyroid hormones.",
    "treatment": "Thyroid hormone replacement therapy."
  },
  "Hyperthyroidism": {
    "title": "Hyperthyroidism",
    "description": "A condition where the thyroid gland produces an excessive amount of thyroid hormones.",
    "treatment": "Antithyroid medications, radioactive iodine therapy, surgery."
  },
  "Hypoglycemia": {
    "title": "Hypoglycemia",
    "description": "A condition where blood sugar levels fall too low.",
    "treatment": "Glucose tablets, intravenous glucose."
  },
  "Osteoarthritis": {
    "title": "Osteoarthritis",
    "description": "A degenerative joint disease causing the cartilage to break down.",
    "treatment": "Pain relievers, physical therapy, joint replacement surgery in severe cases."
  },
  "Arthritis": {
    "title": "Arthritis",
    "description": "Inflammation of the joints, leading to pain, stiffness, and swelling.",
    "treatment": "Nonsteroidal anti-inflammatory drugs (NSAIDs), physical therapy."
  },
  "(vertigo) Paroxysmal Positional Vertigo": {
    "title": "(vertigo) Paroxysmal Positional Vertigo",
    "description": "A type of dizziness caused by changes in head position, leading to a spinning sensation.",
    "treatment": "Epley maneuver, vestibular rehabilitation therapy."
  },
  "Acne": {
    "title": "Acne",
    "description": "A skin condition where hair follicles become clogged with oil and dead skin cells.",
    "treatment": "Topical treatments, oral medications, and sometimes laser therapy."
  },
  "Urinary tract infection": {
    "title": "Urinary tract infection",
    "description": "An infection in any part of the urinary system.",
    "treatment": "Antibiotics."
  },
  "Psoriasis": {
    "title": "Psoriasis",
    "description": "A skin condition characterized by rapid skin cell turnover, resulting in scaling and inflammation.",
    "treatment": "Topical treatments, phototherapy, systemic medications."
  },
  "Impetigo": {
    "title": "Impetigo",
    "description": "A highly contagious bacterial skin infection, commonly seen in children.",
    "treatment": "Topical antibiotics, oral antibiotics for severe cases."
  }
};


const SymptomAnalysis = () => {
  const [symptoms, setSymptoms] = useState(["", "", "", "", ""]);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [name, setName] = useState(""); // New state for required field

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

    if (symptoms.every(symptom => !symptom)) {
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
      const response = await axios.post("http://127.0.0.1:5000/symptoms-predict", formData);
      const disease = response.data["Most Accurate Disease"];
      setPrediction(diseaseInfo[disease]);
    } catch (error) {
      console.error("Error predicting disease:", error.response ? error.response.data : error.message);
      setError("Failed to predict. Ensure the backend is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-xl shadow-lg">
      <h2 className="text-xl font-bold mb-4">Symptom Predictor</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="block font-medium">Your Name (required)</label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
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
          <p className="font-semibold">Predicted Disease: {prediction.title}</p>
          <p className="text-lg text-green-700">{prediction.description}</p>
          <p className="font-semibold">Treatment:</p>
          <p>{prediction.treatment}</p>
        </div>
      )}
    </div>
  );
};

export default SymptomAnalysis;
