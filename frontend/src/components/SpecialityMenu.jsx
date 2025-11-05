import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { specialityData } from "../assets/assets";
import { FaStethoscope } from "react-icons/fa";

const SpecialityMenu = () => {
  return (
    <section
      className="px-4 sm:px-6 md:px-12 lg:px-24 py-12 sm:py-16 lg:py-20"
      id="speciality"
    >
      {/* Header Section */}
      <motion.div
        className="text-center mb-12 sm:mb-16"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="inline-flex items-center mb-3 sm:mb-4 space-x-2 sm:space-x-3">
          <div className="w-10 sm:w-12 h-1 bg-primary rounded-full" />
          <h3 className="text-sm sm:text-lg font-semibold text-primary">
            Medical Expertise
          </h3>
          <div className="w-10 sm:w-12 h-1 bg-primary rounded-full" />
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 leading-snug">
          Find by <span className="text-primary">Speciality</span>
        </h2>

        <p className="text-gray-600 max-w-3xl mx-auto text-sm sm:text-base md:text-lg leading-relaxed px-2">
          Connect with specialized medical professionals across various
          disciplines
        </p>
      </motion.div>

      {/* Specialities Grid */}
      <motion.div
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        {specialityData.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -10 }}
          >
            <Link
              to={`/doctors/${item.speciality}`}
              onClick={() => scrollTo(0, 0)}
              className="group block p-4 sm:p-6 lg:p-8 bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer border border-slate-100"
            >
              <div className="w-full h-28 sm:h-36 lg:h-40 mb-4 sm:mb-6 flex items-center justify-center">
                <img
                  src={item.image}
                  alt={item.speciality}
                  className="w-16 sm:w-20 lg:w-24 h-16 sm:h-20 lg:h-24 object-contain transform group-hover:scale-110 transition-transform duration-300"
                />
              </div>

              <h3 className="text-base sm:text-lg lg:text-xl font-bold text-gray-900 text-center mb-1 sm:mb-2">
                {item.speciality}
              </h3>

              <div className="flex items-center justify-center text-primary font-semibold text-xs sm:text-sm lg:text-base group-hover:translate-x-2 transition-transform duration-300">
                <span>View Doctors</span>
                <FaStethoscope className="ml-1 sm:ml-2 text-xs sm:text-sm" />
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default SpecialityMenu;
