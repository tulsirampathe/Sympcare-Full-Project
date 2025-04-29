import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { specialityData } from "../assets/assets";
import { FaStethoscope } from "react-icons/fa";

const SpecialityMenu = () => {
  return (
    <section className="px-6 md:px-12 lg:px-24 py-20 ">
      {/* Header Section */}
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="inline-flex items-center mb-4 space-x-3">
          <div className="w-12 h-1 bg-primary rounded-full" />
          <h3 className="text-lg font-semibold text-primary">Medical Expertise</h3>
          <div className="w-12 h-1 bg-primary rounded-full" />
        </div>
        <h2 className="text-5xl font-bold text-gray-900 mb-4">
          Find by <span className="text-primary">Speciality</span>
        </h2>
        <p className="text-gray-600 max-w-3xl mx-auto text-xl leading-relaxed">
          Connect with specialized medical professionals across various disciplines
        </p>
      </motion.div>

      {/* Specialities Grid */}
      <motion.div
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
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
              className="group block p-8 bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer border border-slate-100"
            >
              <div className="w-full h-40 mb-6 flex items-center justify-center">
                <img 
                  src={item.image} 
                  alt={item.speciality}
                  className="w-24 h-24 object-contain transform group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <h3 className="text-xl font-bold text-gray-900 text-center mb-2">
                {item.speciality}
              </h3>
              <div className="flex items-center justify-center text-primary font-semibold group-hover:translate-x-2 transition-transform duration-300">
                <span>View Doctors</span>
                <FaStethoscope className="ml-2 text-sm" />
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default SpecialityMenu;