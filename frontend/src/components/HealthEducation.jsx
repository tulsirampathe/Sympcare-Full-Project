import axios from "axios";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { FaBrain, FaLeaf, FaSeedling } from "react-icons/fa";

const API_KEY = "49856975-b50f4f2288e42fd6f79dc9c5d";

// Icon mapping for categories
const categoryIcons = {
  "Cough & Cold": <FaLeaf className="text-2xl text-white" />,
  "Stress & Anxiety": <FaBrain className="text-2xl text-white" />,
  "Indigestion & Gut Health": <FaSeedling className="text-2xl text-white" />,
};

// Mapping Symptoms -> Remedies
const symptomData = [
  {
    symptom: "Cough & Cold",
    remedies: [
      {
        title: "Tulsi for Immunity & Lung Health 🌬️",
        description:
          "Holy Basil (Tulsi) enhances immunity by regulating cytokine levels and supports respiratory function naturally.",
        use: "Boil tulsi leaves in water and drink as tea, or chew fresh leaves in the morning.",
        keyword: "Tulsi leaves",
      },
      {
        title: "Licorice (Mulethi) for Throat Health 🍯",
        description:
          "Licorice root reduces throat inflammation and acts as a natural expectorant, supporting upper respiratory tract health.",
        use: "Chew small pieces or drink as tea by boiling in water.",
        keyword: "Mulethi root",
      },
      {
        title: "Giloy for Immunomodulation 🌿",
        description:
          "Giloy modulates the immune system, helpful in chronic fevers and post-viral recovery.",
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
        description:
          "Ashwagandha reduces cortisol (stress hormone) and boosts mental clarity.",
        use: "Take as powder with warm milk before bed or in capsule form.",
        keyword: "Ashwagandha herb",
      },
      {
        title: "Brahmi for Brain Neuroprotection 🧠",
        description:
          "Brahmi improves memory, reduces stress by protecting neurons.",
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
        description:
          "Supports gut bacteria, improves digestion and detoxification.",
        use: "Consume Triphala powder with warm water before bed or early morning.",
        keyword: "Triphala powder",
      },
      {
        title: "Haritaki for Natural Detox 🍃",
        description:
          "Supports gentle cleansing of the digestive tract, promoting healthy elimination.",
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
                  `https://pixabay.com/api/?key=${API_KEY}&q=${encodeURIComponent(
                    remedy.keyword
                  )}&image_type=photo&per_page=3&safesearch=true`
                );
                const image = response.data.hits[0]?.webformatURL;
                return { ...remedy, image };
              } catch (error) {
                console.error(
                  "Error fetching image for",
                  remedy.keyword,
                  error
                );
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
    <div className="px-6 md:px-12 lg:px-24 py-20 bg-gradient-to-b from-slate-50 to-white">
      {/* Header Section */}
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="inline-flex items-center mb-4 space-x-3">
          <div className="w-12 h-1 bg-primary rounded-full" />
          <h3 className="text-lg font-semibold text-primary">
            Ayurvedic Wisdom
          </h3>
          <div className="w-12 h-1 bg-primary rounded-full" />
        </div>
        <h2 className="text-5xl font-bold text-gray-900 mb-4">
          Holistic <span className="text-primary">Remedies</span>
        </h2>
        <p className="text-gray-600 max-w-3xl mx-auto text-xl leading-relaxed">
          Ancient healing solutions powered by modern validation
        </p>
      </motion.div>

      {/* Remedies Grid */}
      <div className="space-y-20">
        {remediesWithImages.map((symptomBlock, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: idx * 0.2 }}
          >
            {/* Category Header */}
            <div className="flex items-center gap-4 mb-12">
              <div className="bg-green-500 w-14 h-14 rounded-xl flex items-center justify-center">
                {categoryIcons[symptomBlock.symptom]}
              </div>
              <h3 className="text-3xl font-bold text-gray-900">
                {symptomBlock.symptom}
              </h3>
            </div>

            {/* Remedies Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {symptomBlock.remedies.map((item, index) => (
                <motion.div
                  key={index}
                  className="group relative bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer border border-slate-100"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                >
                  <div className="p-8">
                    {item.image ? (
                      <div className="w-full h-48 rounded-xl overflow-hidden mb-6">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    ) : (
                      <div className="w-full h-48 bg-gray-100 rounded-xl mb-6 flex items-center justify-center">
                        <FaLeaf className="text-4xl text-gray-400" />
                      </div>
                    )}

                    <h4 className="text-2xl font-bold text-gray-900 mb-4">
                      {item.title}
                    </h4>
                    <p className="text-gray-600 text-lg mb-6">
                      {item.description}
                    </p>

                    <div className="bg-green-50 rounded-lg p-4">
                      <p className="text-sm text-green-700 font-medium">
                        🌿 {item.use}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AyurvedicHealthEducation;
