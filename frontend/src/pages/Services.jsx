import { motion } from "framer-motion";
import React from "react";
import {
  FaCalendarCheck,
  FaHeartbeat,
  FaSeedling,
  FaStethoscope,
  FaUserMd,
  FaArrowRight,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";

const Services = () => {
  const navigate = useNavigate();

  const services = [
    {
      title: "Comprehensive Health Assessments",
      text: "Advanced symptom analysis with AI-powered diagnosis guidance",
      icon: <FaStethoscope className="text-2xl text-white" />,
      color: "bg-green-500",
      route: "/symptom-analysis",
    },
    {
      title: "Instant Appointment Booking",
      text: "Seamless doctor scheduling with real-time availability",
      icon: <FaCalendarCheck className="text-2xl text-white" />,
      color: "bg-blue-500",
      route: "/doctors",
    },
    {
      title: "Skin Disease Detection",
      text: "AI dermatology analysis with instant condition screening",
      icon: <FaHeartbeat className="text-2xl text-white" />,
      color: "bg-red-500",
      route: "/skin-detection",
    },
    {
      title: "Nutrition Analysis",
      text: "Personalized dietary recommendations and meal planning",
      icon: <FaSeedling className="text-2xl text-white" />,
      color: "bg-orange-500",
      route: "/nutrition-check",
    },
  ];

  const mentalService = {
    title: "AI Mental Wellness Assistant",
    text: "24/7 emotional support with cognitive behavioral therapy techniques and mood tracking",
    icon: <FaUserMd className="text-3xl text-white" />,
    route: "/health-assessment",
  };

  return (
    <section className="px-6 py-20" id="services">
      {/* Main Services Section */}
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="inline-flex items-center mb-4 space-x-3">
          <div className="w-12 h-1 bg-primary rounded-full"></div>
          <h3 className="text-lg font-semibold text-primary">Our Services</h3>
          <div className="w-12 h-1 bg-primary rounded-full"></div>
        </div>
        <h2 className="text-5xl font-bold text-gray-900 mb-4">
          Transformative <span className="text-primary">Healthcare</span>
        </h2>
        <p className="text-gray-600 max-w-3xl mx-auto text-xl leading-relaxed">
          Next-generation medical solutions powered by AI and expert care
        </p>
      </motion.div>

      {/* Services Grid */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        {services.map((service, index) => (
          <motion.div
            key={index}
            onClick={() => {
              navigate(service.route);
              scrollTo(0, 0);
            }}
            className="group relative p-8 bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer border border-slate-100 hover:border-primary/20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -10 }}
          >
            <div className={`${service.color} w-14 h-14 rounded-xl mb-6 flex items-center justify-center transform group-hover:rotate-12 transition-all duration-300`}>
              {service.icon}
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4 leading-tight">
              {service.title}
            </h3>
            <p className="text-gray-600 text-lg mb-6">{service.text}</p>
            <div className="flex items-center text-primary font-semibold group-hover:translate-x-2 transition-transform duration-300">
              <span>Explore Service</span>
              <FaArrowRight className="ml-2 text-sm" />
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Mental Health Highlight */}
      <div className="max-w-7xl mx-auto bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl shadow-2xl overflow-hidden">
        <div className="flex flex-col md:flex-row items-center">
          <motion.div
            className="md:w-1/2 p-12"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="bg-white/10 w-fit p-4 rounded-2xl mb-8">
              {mentalService.icon}
            </div>
            <h3 className="text-4xl font-bold text-white mb-6 leading-snug">
              {mentalService.title}
            </h3>
            <p className="text-blue-100 text-lg mb-8">{mentalService.text}</p>
            <motion.button
              onClick={() => {
                navigate(mentalService.route);
                scrollTo(0, 0);
              }}
              className="bg-white text-blue-600 px-8 py-4 rounded-xl font-bold flex items-center gap-3 hover:gap-4 transition-all duration-300 hover:shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Start Free Assessment
              <FaArrowRight className="text-sm" />
            </motion.button>
          </motion.div>

          <motion.div
            className="md:w-1/2 h-full"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <img
              className="w-full h-full object-cover"
              src={assets.Mental_Health}
              alt="Mental Health Support"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Services;