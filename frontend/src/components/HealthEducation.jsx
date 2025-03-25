import React from "react";
import {
  FaBrain,
  FaHeartbeat,
  FaSmile,
  FaShieldVirus,
  FaThermometerHalf,
} from "react-icons/fa";
import { motion } from "framer-motion"; // For animation

const mentalHealthData = [
  {
    title: "How to Prevent Depression? 😔",
    description:
      "Depression is a mental health disorder that affects mood, thoughts, and behavior. It can cause persistent feelings of sadness and loss of interest in daily activities.",
    prevention:
      "Talk to friends and family, practice mindfulness, seek therapy or counseling, exercise regularly, and avoid alcohol or substance use.",
    icon: <FaSmile className="text-blue-500 text-3xl" />,
  },
  {
    title: "How to Manage Anxiety? 😟",
    description:
      "Anxiety is characterized by excessive worry and fear. It can interfere with daily life and cause physical symptoms such as rapid heartbeat and sweating.",
    prevention:
      "Practice relaxation techniques, maintain a balanced lifestyle, seek professional therapy, engage in deep breathing exercises, and get adequate sleep.",
    icon: <FaBrain className="text-purple-500 text-3xl" />,
  },
  {
    title: "How to Prevent Mental Fatigue? 🧠💤",
    description:
      "Mental fatigue occurs when the brain becomes overwhelmed from prolonged periods of mental effort, leading to decreased productivity and focus.",
    prevention:
      "Take regular breaks, get enough sleep, manage stress through relaxation exercises, and practice time management techniques.",
    icon: <FaHeartbeat className="text-pink-500 text-3xl" />,
  },
  {
    title: "Prevent Substance Abuse 🚭",
    description:
      "Substance abuse involves the harmful or hazardous use of psychoactive substances like alcohol or drugs. It can lead to mental health problems and addiction.",
    prevention:
      "Avoid alcohol or drug use, seek professional help for substance dependence, and join support groups or counseling programs.",
    icon: <FaShieldVirus className="text-green-500 text-3xl" />,
  },
  {
    title: "How to Cope with Stress? 😩➡️😌",
    description:
      "Chronic stress can lead to mental and physical health problems. It is important to find effective ways to manage stress to prevent burnout.",
    prevention:
      "Practice stress management techniques such as yoga, meditation, deep breathing, or engaging in hobbies. Talk to a mental health professional for guidance.",
    icon: <FaThermometerHalf className="text-orange-500 text-3xl" />,
  },
  {
    title: "What is PTSD (Post-Traumatic Stress Disorder)? 💔",
    description:
      "PTSD is a mental health condition triggered by experiencing or witnessing a traumatic event. Symptoms include flashbacks, nightmares, and emotional numbness.",
    prevention:
      "Seek professional help, engage in trauma-focused therapy, and practice self-care techniques such as journaling or mindfulness.",
    icon: <FaBrain className="text-blue-500 text-3xl" />,
  },
  {
    title: "Prevent Suicidal Thoughts 😞",
    description:
      "Suicidal thoughts can stem from feelings of hopelessness and depression. It's important to take them seriously and seek help immediately.",
    prevention:
      "Talk to a therapist, engage in supportive conversations with friends and family, and seek emergency help if you or someone you know is at risk.",
    icon: <FaSmile className="text-red-500 text-3xl" />,
  },
  {
    title: "How to Improve Sleep for Mental Health? 💤",
    description:
      "Poor sleep quality is linked to various mental health conditions such as anxiety, depression, and stress. Proper sleep hygiene is essential for emotional well-being.",
    prevention:
      "Maintain a consistent sleep schedule, avoid caffeine before bed, create a relaxing bedtime routine, and limit screen time before sleep.",
    icon: <FaHeartbeat className="text-purple-500 text-3xl" />,
  },
];

const MentalHealthEducation = () => {
  return (
    <div className="px-6 md:px-12 lg:px-24">
      {/* Section Title */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-800">
          MENTAL <span className="text-primary">HEALTH EDUCATION</span>
        </h2>
        <p className="text-gray-600 mt-2">
          Learn about mental health care and wellness strategies. 🌱
        </p>
      </div>

      {/* Content Section */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {mentalHealthData.map((item, index) => (
          <motion.div
            key={index}
            className="border p-8 rounded-lg text-center bg-white shadow-md hover:bg-zinc-300 transition-all duration-300 cursor-pointer"
            whileHover={{ scale: 1.05 }} // Animation on hover
            whileTap={{ scale: 0.95 }} // Animation on click
          >
            <div className="flex justify-center mb-4">{item.icon}</div>
            <h3 className="text-xl font-semibold">{item.title}</h3>
            <p className="mt-2 text-gray-600 group-hover:text-white">
              {item.description}
            </p>
            <p className="text-sm text-green-600 font-medium mt-2">
              🛑 {item.prevention}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default MentalHealthEducation;
