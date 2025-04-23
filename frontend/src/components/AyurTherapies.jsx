import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_KEY = "49856975-b50f4f2288e42fd6f79dc9c5d";

const staticData = [
  // Ayurvedic Treatments
  {
    name: "Abhyanga",
    title: "Abhyanga (Ayurvedic Oil Treatment) 🛀",
    description: "A full-body warm oil massage that improves circulation, reduces muscle stiffness, and promotes relaxation.",
    use: "Performed using medicated herbal oils suited to your dosha, usually before bathing.",
    keyword: "ayurvedic oil massage",
  },
  {
    name: "Shirodhara",
    title: "Shirodhara (Oil on Forehead) 🧴",
    description: "A continuous stream of warm oil is poured on the forehead to calm the mind and balance the nervous system.",
    use: "Best done in a calm environment; follow up with rest and gentle head massage.",
    keyword: "shirodhara ayurveda",
  },
  {
    name: "Marma",
    title: "Marma (Energy Points) Balancing Treatment ✨",
    description: "Stimulates 107 energy points in the body to balance prana (life force) and relieve emotional and physical blocks.",
    use: "Involves gentle massage with herbal oils on marma points by a trained therapist.",
    keyword: "marma ayurvedic therapy",
  },
  {
    name: "Kati Basti",
    title: "Kati Basti (Pool of Oil on Sacrum) 🌡️",
    description: "A treatment for lower back pain where warm medicated oil is retained on the lower back in a dough ring.",
    use: "Done under professional supervision; followed by massage or steam.",
    keyword: "ayurvedic lower back therapy",
  },
  {
    name: "Hands/Head/Face/Feet Treatment",
    title: "Hands/Head/Face/Feet Treatment 🤲",
    description: "Focused oil massage on specific areas to relieve tension and enhance blood flow and relaxation.",
    use: "Ideal for stress relief; uses specific herbal oils depending on the target area.",
    keyword: "head foot massage ayurveda",
  },
  {
    name: "Garshana",
    title: "Garshana (Raw Silk Gloves Exfoliation) 🧤",
    description: "A dry exfoliation technique using raw silk gloves to stimulate the lymphatic system and remove toxins.",
    use: "Performed before oil massage to improve skin texture and boost circulation.",
    keyword: "ayurvedic dry massage",
  },
  {
    name: "Lepana",
    title: "Lepana (Detoxifying Clay) 🧱",
    description: "Application of medicated herbal paste on affected body parts for pain relief and detoxification.",
    use: "Usually done in cases of inflammation, joint pain, or skin issues.",
    keyword: "herbal paste ayurveda",
  },
  {
    name: "Swedana",
    title: "Swedana (Herbal Steam Therapy) 🌫️",
    description: "An herbal steam bath that opens pores, flushes toxins, and relieves stiffness and congestion.",
    use: "Often done after oil massage (Abhyanga) for better absorption and detox.",
    keyword: "herbal steam bath ayurveda",
  },
  {
    name: "Udvartana",
    title: "Udvartana (Dry Powder Application) 🧼",
    description: "A body massage with herbal powders that reduces cellulite, improves skin tone, and aids fat metabolism.",
    use: "Done in upward strokes on the body, especially for Kapha dosha imbalance.",
    keyword: "herbal powder massage ayurveda",
  },
  {
    name: "Nasya",
    title: "Nasya (Nasal Therapy) 👃",
    description: "Therapeutic administration of medicated oils through the nostrils to clear sinuses and improve brain function.",
    use: "Best done in the morning after cleansing and under supervision.",
    keyword: "nasya ayurveda",
  },
  {
    name: "Gandusha and Kavala",
    title: "Gandusha and Kavala (Oil Pulling)",
    description: "Traditional oral detox method where oil is swished in the mouth to remove toxins and improve oral health.",
    use: "Swish sesame or coconut oil in the mouth for 10–20 minutes, then spit out.",
    keyword: "oil pulling ayurveda",
  },
  {
    name: "Panchakarma",
    title: "Panchakarma (Detoxification and Cleansing) 🧘‍♀️",
    description: "A five-fold purification therapy that deeply detoxifies the body and balances the doshas.",
    use: "Includes Vamana, Virechana, Basti, Nasya, and Raktamokshana. Conducted under professional guidance.",
    keyword: "panchakarma detox ayurveda",
  },
];

  


const AyurTherapies = () => {
  const [remedies, setRemedies] = useState([]);
const navigate = useNavigate();

  useEffect(() => {
  const fetchImages = async () => {
    const updatedData = await Promise.all(
      staticData.map(async (item) => {
        try {
          const response = await axios.get(
            `https://pixabay.com/api/?key=${API_KEY}&q=${encodeURIComponent(item.keyword)}&image_type=photo&per_page=5&safesearch=true`
          );
          const hits = response.data.hits;
          const image = hits.length > 0 ? hits[Math.floor(Math.random() * hits.length)].webformatURL : "";

        return { ...item, image };
        } catch (error) {
          console.error("Error fetching image for", item.keyword, error);
          return { ...item, image: "" };
        }
      })
    );
    setRemedies(updatedData);
  };

  fetchImages();
}, []);


  return (
    <div className="px-6 md:px-12 lg:px-24">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-green-800">
        Ayurvedic Therapies
        </h2>
        <p className="text-gray-600 mt-2">
        Healing Naturally – The Ayurvedic Way to Balance Body, Mind & Soul 🌿
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {remedies.map((item, index) => (
          <motion.div
            key={index}
            className="border p-6 rounded-lg bg-white text-center shadow-md hover:bg-lime-100 transition duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/therapie", { state: { therapy: item } })}
            >
            {item.image ? (
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-40 object-cover rounded-md mb-4"
              />
            ) : (
              <div className="w-full h-40 bg-gray-200 rounded-md mb-4 flex items-center justify-center text-sm text-gray-500">
                Image not available
              </div>
            )}
            <h3 className="text-xl font-semibold text-green-700">{item.title}</h3>
            <p className="mt-2 text-gray-600">{item.description}</p>
            <p className="text-sm text-emerald-600 font-medium mt-2">
              🌿 Use: {item.use}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AyurTherapies;
