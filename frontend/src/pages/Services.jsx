import { motion } from "framer-motion";
import React from "react";
import { FaCalendarCheck, FaHeartbeat, FaStethoscope, FaUserMd } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";

const Services = () => {
  const navigate = useNavigate();

  const services = [
    {
      title: "AI-Powered Mental Wellness",
      text: "Experience 24/7 AI-driven emotional support, personalized mental health assessments, and instant professional insights for holistic well-being.",
      icon: <FaUserMd className="text-6xl text-blue-600" />, 
      route: "/health-assessment",
    }
    ,
    {
      title: "Comprehensive Health Assessments",
      text: "Get accurate symptom analysis and initial diagnosis guidance.",
      icon: <FaStethoscope className="text-4xl text-green-600" />,
      route: "/symptom-analysis",
    },
    {
      title: "Hassle-Free Appointment Booking",
      text: "Easily schedule your doctor appointments online with just a few clicks.",
      icon: <FaCalendarCheck className="text-4xl text-blue-600" />,
      route: "/doctors",
    },
    {
      title: "Advanced Skin Disease Detection",
      text: "AI-powered skin analysis to detect potential dermatological conditions.",
      icon: <FaHeartbeat className="text-4xl text-red-600" />,
      route: "/skin-detection",
    },
  ];

  const [featuredService, ...otherServices] = services;

  return (
    <section className="px-6 py-16" id="services">
      {/* Hackathon Focus Section */}
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h2 className="text-4xl font-bold text-gray-800 mb-4">
          Mental Health<span className="text-primary"> AI Assistant</span>
        </h2>
        <p className="text-gray-600 max-w-3xl mx-auto text-lg">
          Revolutionizing mental healthcare through AI-powered emotional support
          and instant psychological assessments.
        </p>
      </motion.div>

      {/* Featured Mental Health AI Assistant */}
      <div className="mb-12 flex flex-col md:flex-row items-center gap-12">
        {/* Chatbot Illustration */}
        <motion.div
          className="md:w-2/3 flex justify-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <img
            className="w-full max-w-md bg-primary  rounded-lg shadow-xl hover:scale-105 transition-transform duration-300"
            src={assets.Mental_Health}
            alt="Mental Health AI Chatbot"
          />
        </motion.div>

        {/* Featured Service Card */}
        <motion.div
          className="flex flex-col items-center p-8 bg-white shadow-lg rounded-xl cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          whileHover={{ scale: 1.1 }}
          onClick={() => {
            navigate(featuredService.route);
            scrollTo(0, 0);
          }}
        >
          {/* Animated Icon */}
          <motion.div
            className="mb-6 flex justify-center items-center w-16 h-16 rounded-full shadow-lg"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 120, delay: 0.5 }}
            whileHover={{ rotate: 10 }}
          >
            {featuredService.icon}
          </motion.div>

          <h3 className="text-xl font-semibold text-gray-800 text-center mb-3">
            {featuredService.title}
          </h3>
          <p className="text-gray-600 text-center">{featuredService.text}</p>
          <motion.button
            className="mt-4 bg-primary text-white px-6 py-2 rounded-full font-semibold hover:bg-primary-dark transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            Try AI Assistant Now
          </motion.button>
        </motion.div>
      </div>

      {/* Other Services Section */}
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
      >
        <h3 className="text-3xl font-bold text-gray-800">
          Our <span className="text-primary">Healthcare Services</span>
        </h3>
        <p className="text-gray-600 max-w-2xl mx-auto mt-3">
          Comprehensive digital health solutions supporting your wellness
          journey
        </p>
      </motion.div>

      {/* Animated Grid of Services */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        {otherServices.map((service, index) => (
          <motion.div
            key={index}
            onClick={() => {
              navigate(service.route);
              scrollTo(0, 0);
            }}
            className="flex flex-col items-center p-8 bg-white shadow-lg rounded-xl cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            whileHover={{ scale: 1.05, rotate: 2 }}
          >
            <motion.div
              className="mb-6 relative"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              whileHover={{ rotate: 10 }}
            >
              {service.icon}
            </motion.div>
            <h3 className="text-xl font-semibold text-gray-800 text-center mb-3">
              {service.title}
            </h3>
            <p className="text-gray-600 text-center">{service.text}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default Services;
