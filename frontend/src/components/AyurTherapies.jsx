import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";

const API_KEY = "49856975-b50f4f2288e42fd6f79dc9c5d";

const staticData = [
  {
    title: "Ashwagandha for Stress Relief 🧘‍♂️",
    description: "Ashwagandha is an adaptogenic herb known for reducing stress, anxiety, and improving energy levels.",
    use: "Take as a powder with warm milk before bed or in capsule form daily.",
    keyword: "Ashwagandha herb",
  },
  {
    title: "Triphala for Digestion 🍃",
    description: "A combination of three fruits – Amalaki, Bibhitaki, and Haritaki – Triphala is excellent for gut health and detox.",
    use: "Consume Triphala powder with warm water before bed or early morning.",
    keyword: "Triphala powder",
  },
  {
    title: "Neem for Skin Problems 🌿",
    description: "Neem has antibacterial and antifungal properties that help purify blood and treat skin conditions like acne and eczema.",
    use: "Apply neem paste to affected areas or consume neem capsules after meals.",
    keyword: "Neem leaves",
  },
  {
    title: "Tulsi for Respiratory Health 🌬️",
    description: "Holy Basil (Tulsi) is revered in Ayurveda for boosting immunity and treating cough, cold, and bronchitis.",
    use: "Boil tulsi leaves in water and drink as tea, or chew fresh leaves in the morning.",
    keyword: "Tulsi leaves",
  },
  {
    title: "Brahmi for Memory 🧠",
    description: "Brahmi improves cognitive functions, reduces anxiety, and enhances memory retention.",
    use: "Consume as a tonic, capsule, or with warm ghee in the morning.",
    keyword: "Brahmi plant",
  },
  {
    title: "Amla for Immunity 💪",
    description: "Rich in Vitamin C, Amla (Indian Gooseberry) rejuvenates tissues, improves eyesight, and strengthens immunity.",
    use: "Drink amla juice daily or eat raw with a pinch of salt.",
    keyword: "Amla fruit",
  },
  {
    title: "Shatavari for Women's Health 🌸",
    description: "Shatavari is beneficial for female reproductive health, hormonal balance, and lactation.",
    use: "Consume in powder form with milk or in capsule form.",
    keyword: "Shatavari root",
  },
  {
    title: "Giloy for Fever and Immunity 🌿",
    description: "Giloy is known to boost immunity and treat chronic fever and respiratory issues.",
    use: "Boil giloy stems in water and drink, or take giloy capsules daily.",
    keyword: "Giloy plant",
  },
  {
    title: "Licorice (Mulethi) for Sore Throat 🍯",
    description: "Mulethi soothes sore throat, aids in digestion, and boosts respiratory health.",
    use: "Chew small pieces or drink as tea by boiling in water.",
    keyword: "Mulethi root",
  },
  {
    title: "Haritaki for Detoxification 🍃",
    description: "Haritaki is a powerful detoxifier and supports digestive and respiratory health.",
    use: "Take with warm water before bedtime.",
    keyword: "Haritaki fruit",
  },
 
  {
    title: "Gokshura for Urinary Health 💧",
    description: "Gokshura supports urinary tract health and enhances physical stamina.",
    use: "Consume with milk or in capsule form.",
    keyword: "Gokshura plant",
  },
];

const AyurTherapies = () => {
  const [remedies, setRemedies] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      const updatedData = await Promise.all(
        staticData.map(async (item) => {
          try {
            const response = await axios.get(
              `https://pixabay.com/api/?key=${API_KEY}&q=${encodeURIComponent(item.keyword)}&image_type=photo&per_page=3&safesearch=true`
            );
            const image = response.data.hits[0]?.webformatURL;
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
          Explore the wisdom of Ayurveda – natural herbs and healing for body, mind & soul 🌿
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {remedies.map((item, index) => (
          <motion.div
            key={index}
            className="border p-6 rounded-lg bg-white text-center shadow-md hover:bg-lime-100 transition duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
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
