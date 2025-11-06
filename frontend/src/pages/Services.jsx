import { motion } from "framer-motion";
import React from "react";
import {
  FaCalendarCheck,
  FaHeartbeat,
  FaSeedling,
  FaStethoscope,
  FaUserMd,
  FaFileMedical,
  FaArrowRight,
  FaStar,
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
      color: "bg-blue-400",
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
      color: "bg-blue-600",
      route: "/skin-detection",
    },
    {
      title: "Nutrition Analysis",
      text: "Personalized dietary recommendations and meal planning",
      icon: <FaSeedling className="text-2xl text-white" />,
      color: "bg-blue-400",
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
    <section
      className="relative px-4 sm:px-6 py-10 sm:py-10 lg:py-20"
      id="services"
    >
      {/* Hero Header */}
      <motion.div
        className="text-center mb-16 sm:mb-20"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="inline-flex items-center mb-3 sm:mb-4 space-x-3">
          <div className="w-10 sm:w-12 h-1 bg-blue-500 rounded-full"></div>
          <h3 className="text-sm sm:text-lg font-semibold text-blue-500">
            Our Services
          </h3>
          <div className="w-10 sm:w-12 h-1 bg-blue-500 rounded-full"></div>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 leading-snug">
          Transformative <span className="text-blue-500">Healthcare</span>
        </h2>
        <p className="text-gray-600 max-w-3xl mx-auto text-base sm:text-lg md:text-xl leading-relaxed px-2">
          Next-generation medical solutions powered by AI and expert care.
        </p>
      </motion.div>

      {/* Featured Service */}
      <motion.div
        className="max-w-6xl mx-auto mb-16 sm:mb-24 relative"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div
          onClick={() => {
            navigate("/report-analysis");
            scrollTo(0, 0);
          }}
          className="group relative bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 rounded-3xl shadow-2xl transition-all duration-500 cursor-pointer overflow-hidden hover:scale-[1.01]"
        >
          {/* Glow Border */}
          <div className="absolute inset-0 rounded-3xl border-2 border-blue-400/20 group-hover:border-blue-300/40 transition-all duration-500"></div>

          {/* Stars Badge */}
          <div className="absolute top-4 right-4 sm:top-5 sm:right-5 bg-gradient-to-r from-blue-800 to-blue-900 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-bold flex items-center gap-1.5 sm:gap-2 shadow-lg z-10">
            <FaStar className="text-yellow-300 animate-pulse" />
            <FaStar className="text-yellow-300 animate-pulse" />
            <FaStar className="text-yellow-300 animate-pulse" />
          </div>

          <div className="relative z-10 p-6 sm:p-10 lg:p-14 flex flex-col lg:flex-row items-center gap-6 lg:gap-10">
            {/* Left Content */}
            <div className="flex-1 text-white space-y-4 sm:space-y-6">
              <div className="flex items-center gap-3">
                <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
                  <FaFileMedical className="text-2xl text-white" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold">
                  Medical Report Analysis
                </h3>
              </div>

              <p className="text-blue-100 text-sm sm:text-base md:text-lg leading-relaxed">
                <strong>AI-powered assistant</strong> that transforms complex
                medical reports into clear, actionable insights for both
                patients and doctors.
              </p>

              <div className="flex flex-wrap gap-2">
                {["Lab Reports", "Prescriptions", "Drug Interactions", "Clinical Data"].map((tag, i) => (
                  <span
                    key={i}
                    className="bg-white/20 text-white px-3 py-1 rounded-full text-[10px] sm:text-xs font-medium backdrop-blur-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <motion.button
                className="bg-white text-blue-600 px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl font-bold text-sm sm:text-base flex items-center gap-2 hover:gap-3 transition-all duration-300 hover:shadow-xl group-hover:scale-105"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Start Report Analysis
                <FaArrowRight className="text-xs transform group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </div>

            {/* Right Visual */}
            <motion.div
              className="flex-1 flex justify-center"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-white/10 p-4 sm:p-5 rounded-2xl backdrop-blur-sm border border-white/20 max-w-[220px] sm:max-w-xs">
                <div className="text-center text-white mb-3">
                  <p className="text-xs sm:text-sm font-semibold">Try It Now</p>
                  <p className="text-blue-200 text-[10px] sm:text-xs">
                    Upload medical documents
                  </p>
                </div>
                <div className="bg-white rounded-xl p-3 sm:p-4 shadow-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-2 h-2 rounded-full bg-red-400"></div>
                    <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                    <div className="w-2 h-2 rounded-full bg-green-400"></div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-2 bg-blue-100 rounded"></div>
                    <div className="h-2 bg-blue-200 rounded w-3/4"></div>
                    <div className="h-2 bg-blue-100 rounded"></div>
                    <div className="h-2 bg-blue-300 rounded w-1/2"></div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Additional Services */}
      <motion.div
        className="text-center mb-10 sm:mb-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <h3 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2 sm:mb-4">
          Additional <span className="text-blue-500">Healthcare Services</span>
        </h3>
        <p className="text-gray-600 text-sm sm:text-base md:text-lg max-w-2xl mx-auto px-3">
          Explore our full suite of AI-powered healthcare solutions.
        </p>
      </motion.div>

      {/* Services Grid */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8 mb-16 sm:mb-24"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.6 }}
      >
        {services.map((service, index) => (
          <motion.div
            key={index}
            onClick={() => {
              navigate(service.route);
              scrollTo(0, 0);
            }}
            className="group relative p-6 sm:p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer border border-blue-100 hover:border-blue-300 hover:-translate-y-2"
            whileHover={{ scale: 1.02 }}
          >
            <div
              className={`${service.color} w-12 h-12 sm:w-14 sm:h-14 rounded-xl mb-4 sm:mb-6 flex items-center justify-center transform group-hover:rotate-12 transition-all duration-300 shadow-md`}
            >
              {service.icon}
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-3 leading-tight">
              {service.title}
            </h3>
            <p className="text-gray-600 text-sm sm:text-base mb-4 sm:mb-6">
              {service.text}
            </p>
            <div className="flex items-center text-blue-500 font-semibold text-sm sm:text-base group-hover:translate-x-2 transition-transform duration-300">
              <span>Explore Service</span>
              <FaArrowRight className="ml-2 text-xs" />
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Mental Health Section */}
      <div className="max-w-7xl mx-auto bg-gradient-to-r from-blue-600 to-blue-700 rounded-3xl shadow-2xl overflow-hidden">
        <div className="flex flex-col md:flex-row items-center">
          <motion.div
            className="md:w-1/2 p-8 sm:p-12"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
          >
            <div className="bg-white/10 w-fit p-3 sm:p-4 rounded-2xl mb-6 sm:mb-8">
              {mentalService.icon}
            </div>
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 sm:mb-6 leading-snug">
              {mentalService.title}
            </h3>
            <p className="text-blue-100 text-sm sm:text-base md:text-lg mb-6 sm:mb-8">
              {mentalService.text}
            </p>
            <motion.button
              onClick={() => {
                navigate(mentalService.route);
                scrollTo(0, 0);
              }}
              className="bg-white text-blue-600 px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold text-sm sm:text-base flex items-center gap-2 sm:gap-3 hover:gap-4 transition-all duration-300 hover:shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Start Free Assessment
              <FaArrowRight className="text-xs sm:text-sm" />
            </motion.button>
          </motion.div>

          <motion.div
            className="md:w-1/2"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <img
              className="w-full h-full object-cover rounded-t-3xl md:rounded-none"
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
