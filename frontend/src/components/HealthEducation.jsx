import React from "react";
import {
  FaAppleAlt,
  FaBone,
  FaBrain,
  FaHeartbeat,
  FaLungs,
  FaShieldVirus,
  FaSmile,
  FaSmokingBan,
  FaSyringe,
  FaThermometerHalf,
  FaTint,
  FaToilet,
} from "react-icons/fa";
import { FaMosquito } from "react-icons/fa6";

const healthData = [
  {
    title: "How to Prevent Dengue?",
    description:
      "Dengue spreads through mosquitoes. Do not let water accumulate, wear full-sleeved clothes, and use mosquito nets.",
    prevention:
      "Use mosquito repellent cream, empty water containers regularly.",
    icon: <FaMosquito className="text-red-500 text-3xl" />,
  },
  {
    title: "What is Diabetes?",
    description:
      "Diabetes occurs when blood sugar levels rise due to poor diet and lifestyle.",
    prevention:
      "Reduce sugar intake, exercise daily, and eat more green vegetables.",
    icon: <FaSyringe className="text-blue-500 text-3xl" />,
  },
  {
    title: "How to Control Blood Pressure?",
    description:
      "High blood pressure can lead to heart disease. Reduce salt intake, practice yoga, and manage stress.",
    prevention: "Exercise regularly, avoid smoking, and drink plenty of water.",
    icon: <FaHeartbeat className="text-pink-500 text-3xl" />,
  },
  {
    title: "Prevent Malnutrition",
    description:
      "Lack of proper nutrition can affect growth, especially in children.",
    prevention: "Eat a balanced diet with milk, fruits, and vegetables.",
    icon: <FaAppleAlt className="text-green-500 text-3xl" />,
  },
  {
    title: "What is Tuberculosis (TB)?",
    description: "TB is a lung infection spread through coughing and sneezing.",
    prevention:
      "Cover your mouth, complete the TB treatment, and get vaccinated.",
    icon: <FaLungs className="text-gray-500 text-3xl" />,
  },
  {
    title: "Prevent Typhoid Fever",
    description:
      "Typhoid spreads through contaminated food and water, causing high fever and weakness.",
    prevention: "Drink clean water, eat hygienic food, and get vaccinated.",
    icon: <FaThermometerHalf className="text-orange-500 text-3xl" />,
  },
  {
    title: "Prevent Jaundice",
    description:
      "Jaundice affects the liver and causes yellowing of skin and eyes.",
    prevention: "Get vaccinated, avoid alcohol, and eat healthy foods.",
    icon: <FaTint className="text-yellow-500 text-3xl" />,
  },
  {
    title: "Prevent Depression",
    description:
      "Depression causes sadness, anxiety, and loss of interest in activities.",
    prevention:
      "Talk to friends and family, meditate, and seek professional help.",
    icon: <FaSmile className="text-blue-500 text-3xl" />,
  },
  {
    title: "Prevent Stroke",
    description:
      "Stroke occurs when blood flow to the brain is blocked, causing paralysis.",
    prevention: "Control blood pressure, eat healthy, and avoid smoking.",
    icon: <FaBrain className="text-purple-500 text-3xl" />,
  },
  {
    title: "What is Osteoporosis?",
    description:
      "Weak bones increase the risk of fractures, especially in older adults.",
    prevention:
      "Eat calcium-rich foods, get sunlight for vitamin D, and exercise regularly.",
    icon: <FaBone className="text-gray-700 text-3xl" />,
  },
  {
    title: "Prevent Diarrhea",
    description:
      "Diarrhea causes dehydration and weakness, mainly due to dirty water or food.",
    prevention: "Drink clean water, wash hands properly, and eat fresh food.",
    icon: <FaToilet className="text-brown-500 text-3xl" />,
  },
  {
    title: "Prevent Asthma",
    description:
      "Asthma causes difficulty in breathing due to pollution or allergies.",
    prevention: "Avoid dust and smoke, use an inhaler if needed.",
    icon: <FaLungs className="text-blue-500 text-3xl" />,
  },
  {
    title: "Prevent COVID-19",
    description:
      "COVID-19 is a viral disease that spreads through air and touch.",
    prevention: "Wear masks, wash hands, and maintain social distancing.",
    icon: <FaShieldVirus className="text-green-500 text-3xl" />,
  },
  {
    title: "Prevent Liver Disease",
    description:
      "Liver damage is caused by alcohol, fatty food, and hepatitis infection.",
    prevention: "Avoid alcohol, eat healthy, and get vaccinated for hepatitis.",
    icon: <FaHeartbeat className="text-red-500 text-3xl" />, // Replacing FaLiver
  },
  {
    title: "Prevent Lung Cancer",
    description: "Lung cancer is mainly caused by smoking and pollution.",
    prevention: "Quit smoking, avoid polluted areas, and do regular checkups.",
    icon: <FaSmokingBan className="text-gray-500 text-3xl" />,
  },
];

const HealthEducation = () => {
  return (
    <div className="px-6 md:px-12 lg:px-24">
      {/* Section Title */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-800">
          HEALTH <span className="text-primary">EDUCATION</span>
        </h2>
        <p className="text-gray-600 mt-2">
          Learn about disease prevention and healthy living
        </p>
      </div>

      {/* Content Section */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {healthData.map((item, index) => (
          <div
            key={index}
            className="border p-8 rounded-lg text-center bg-white shadow-md hover:bg-zinc-300  transition-all duration-300 cursor-pointer"
          >
            <div className="flex justify-center mb-4">{item.icon}</div>
            <h3 className="text-xl font-semibold">{item.title}</h3>
            <p className="mt-2 text-gray-600 group-hover:text-white">
              {item.description}
            </p>
            <p className="text-sm text-green-600 font-medium mt-2">
              🛑 {item.prevention}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HealthEducation;
