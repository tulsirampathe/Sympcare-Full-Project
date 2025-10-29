import { motion } from "framer-motion";
import { FaClock, FaUserCheck, FaHeartbeat, FaRocket } from "react-icons/fa";
import { assets } from "../assets/assets";

const About = () => {
  return (
    <div className="px-6 md:px-12 lg:px-24 py-20 ">
      {/* Section Title */}
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="inline-flex items-center mb-4 space-x-3">
          <div className="w-12 h-1 bg-primary rounded-full"></div>
          <h3 className="text-lg font-semibold text-primary">Who We Are</h3>
          <div className="w-12 h-1 bg-primary rounded-full"></div>
        </div>
        <h2 className="text-5xl font-bold text-gray-900 mb-4">
          Transforming <span className="text-primary">Healthcare</span>
        </h2>
        <p className="text-gray-600 max-w-3xl mx-auto text-xl leading-relaxed">
          Pioneering AI-driven health solutions for better patient outcomes
        </p>
      </motion.div>

      {/* Content Section */}
      <div className="flex flex-col md:flex-row items-center gap-12 mb-24">
        {/* Image Section */}
        <motion.div
          className="md:w-1/2 flex justify-center"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <img
            className="w-full max-w-xl rounded-2xl shadow-xl hover:scale-105 transition-transform duration-300"
            src={assets.about_image}
            alt="About SympCare"
          />
        </motion.div>

        {/* Text Content */}
        <motion.div
          className="md:w-1/2 text-gray-700 space-y-8"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h3 className="text-4xl font-bold text-gray-900">
            Revolutionizing <span className="text-primary">Healthcare</span>
          </h3>
          <p className="text-lg leading-relaxed">
            We're redefining medical care through intelligent symptom analysis
            and predictive health management solutions.
          </p>
          
          <div className="space-y-6">
            <motion.div 
              className="p-6 bg-white rounded-xl shadow-sm border border-slate-100"
              whileHover={{ y: -5 }}
            >
              <h4 className="text-xl font-bold text-gray-900 mb-3">
                AI-Powered Diagnostics
              </h4>
              <p className="text-gray-600">
                Advanced machine learning algorithms providing accurate
                preliminary assessments and care recommendations.
              </p>
            </motion.div>

            <motion.div 
              className="p-6 bg-white rounded-xl shadow-sm border border-slate-100"
              whileHover={{ y: -5 }}
            >
              <h4 className="text-xl font-bold text-gray-900 mb-3">
                Proactive Health Management
              </h4>
              <p className="text-gray-600">
                Continuous monitoring and preventive care strategies for
                long-term wellness.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Why Choose Us Section */}
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="inline-flex items-center mb-4 space-x-3">
          <div className="w-12 h-1 bg-primary rounded-full"></div>
          <h3 className="text-lg font-semibold text-primary">Our Advantages</h3>
          <div className="w-12 h-1 bg-primary rounded-full"></div>
        </div>
        <h2 className="text-5xl font-bold text-gray-900 mb-4">
          Why <span className="text-primary">Choose Us?</span>
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
            title: "Instant Access",
            text: "24/7 availability with immediate symptom assessment",
            icon: <FaClock className="text-2xl text-white" />,
            color: "bg-blue-500",
          },
          {
            title: "Expert Validation",
            text: "AI recommendations verified by medical professionals",
            icon: <FaUserCheck className="text-2xl text-white" />,
            color: "bg-green-500",
          },
          {
            title: "Preventive Care",
            text: "Early detection systems for proactive health management",
            icon: <FaHeartbeat className="text-2xl text-white" />,
            color: "bg-red-500",
          },
        ].map((item, index) => (
          <motion.div
            key={index}
            className="group p-8 bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer border border-slate-100"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -10 }}
          >
            <div className={`${item.color} w-14 h-14 rounded-xl mb-6 flex items-center justify-center transform group-hover:rotate-12 transition-all duration-300`}>
              {item.icon}
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              {item.title}
            </h3>
            <p className="text-gray-600 text-lg">{item.text}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default About;