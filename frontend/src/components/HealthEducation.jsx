import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";

const API_KEY = "49856975-b50f4f2288e42fd6f79dc9c5d";

// Mapping Symptoms -> Remedies
const symptomData = [
  {
    symptom: "Cough & Cold",
    remedies: [
      {
        title: "Tulsi for Immunity & Lung Health 🌬️",
        description: "Holy Basil (Tulsi) enhances immunity by regulating cytokine levels and supports respiratory function naturally.",
        use: "Boil tulsi leaves in water and drink as tea, or chew fresh leaves in the morning.",
        keyword: "Tulsi leaves",
      },
      {
        title: "Licorice (Mulethi) for Throat Health 🍯",
        description: "Licorice root reduces throat inflammation and acts as a natural expectorant, supporting upper respiratory tract health.",
        use: "Chew small pieces or drink as tea by boiling in water.",
        keyword: "Mulethi root",
      },
      {
        title: "Giloy for Immunomodulation 🌿",
        description: "Giloy modulates the immune system, helpful in chronic fevers and post-viral recovery.",
        use: "Boil giloy stems in water and drink, or take giloy capsules daily.",
        keyword: "Giloy plant",
      },
    ],
  },
  {
    symptom: "Stress & Anxiety",
    remedies: [
      {
        title: "Ashwagandha for Stress & Cortisol Balance 🧘‍♂️",
        description: "Ashwagandha reduces cortisol (stress hormone) and boosts mental clarity.",
        use: "Take as powder with warm milk before bed or in capsule form.",
        keyword: "Ashwagandha herb",
      },
      {
        title: "Brahmi for Brain Neuroprotection 🧠",
        description: "Brahmi improves memory, reduces stress by protecting neurons.",
        use: "Consume as a tonic, capsule, or with warm ghee.",
        keyword: "Brahmi plant",
      },
    ],
  },
  {
    symptom: "Indigestion & Gut Health",
    remedies: [
      {
        title: "Triphala for Gut Microbiome 🍃",
        description: "Supports gut bacteria, improves digestion and detoxification.",
        use: "Consume Triphala powder with warm water before bed or early morning.",
        keyword: "Triphala powder",
      },
      {
        title: "Haritaki for Natural Detox 🍃",
        description: "Supports gentle cleansing of the digestive tract, promoting healthy elimination.",
        use: "Take with warm water before bedtime.",
        keyword: "Haritaki fruit",
      },
    ],
  },
  // Add more symptom categories similarly...
];

const AyurvedicHealthEducation = () => {
  const [remediesWithImages, setRemediesWithImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      const updatedData = await Promise.all(
        symptomData.map(async (symptomItem) => {
          const remedies = await Promise.all(
            symptomItem.remedies.map(async (remedy) => {
              try {
                const response = await axios.get(
                  `https://pixabay.com/api/?key=${API_KEY}&q=${encodeURIComponent(remedy.keyword)}&image_type=photo&per_page=3&safesearch=true`
                );
                const image = response.data.hits[0]?.webformatURL;
                return { ...remedy, image };
              } catch (error) {
                console.error("Error fetching image for", remedy.keyword, error);
                return { ...remedy, image: "" };
              }
            })
          );
          return { symptom: symptomItem.symptom, remedies };
        })
      );
      setRemediesWithImages(updatedData);
    };

    fetchImages();
  }, []);

  return (
    <div className="px-6 md:px-12 lg:px-24">
      <div className="text-center">
        <h2 className="text-3xl font-bold">
          Holistic Healing for <span className="text-primary">Common Symptoms</span> 🌿
        </h2>
        <p className="text-gray-600 mt-2">
          Find Ayurvedic remedies based on your symptoms, blending ancient wisdom with modern science.
        </p>
      </div>

      <div className="mt-12 space-y-12">
        {remediesWithImages.map((symptomBlock, idx) => (
          <div key={idx}>
            <h3 className="text-2xl font-semibold text-primary mb-6">{symptomBlock.symptom}</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {symptomBlock.remedies.map((item, index) => (
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
                  <h4 className="text-xl font-semibold text-green-700">{item.title}</h4>
                  <p className="mt-2 text-gray-600">{item.description}</p>
                  <p className="text-sm text-emerald-600 font-medium mt-2">
                    🌿 How to use: {item.use}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AyurvedicHealthEducation;
