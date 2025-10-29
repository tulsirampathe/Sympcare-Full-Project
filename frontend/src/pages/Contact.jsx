import { motion } from "framer-motion";
import { FaBuilding, FaPhone, FaBriefcase, FaMapMarkerAlt } from "react-icons/fa";
import { assets } from "../assets/assets";

const Contact = () => {
  return (
    <div className="px-6 md:px-12 lg:px-24">
      {/* Section Title */}
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="inline-flex items-center mb-4 space-x-3">
          <div className="w-12 h-1 bg-primary rounded-full"></div>
          <h3 className="text-lg font-semibold text-primary">Get in Touch</h3>
          <div className="w-12 h-1 bg-primary rounded-full"></div>
        </div>
        <h2 className="text-5xl font-bold text-gray-900 mb-4">
          Contact <span className="text-primary">SympCare</span>
        </h2>
        <p className="text-gray-600 max-w-3xl mx-auto text-xl leading-relaxed">
          Connect with us for support, partnerships, or career opportunities
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
            src={assets.contact_image}
            alt="Contact SympCare"
          />
        </motion.div>

        {/* Contact Details */}
        <motion.div
          className="md:w-1/2 space-y-8"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {[
            {
              icon: <FaBuilding className="text-2xl text-white" />,
              color: "bg-blue-500",
              title: "Our Office",
              content: (
                <>
                  <p className="flex items-center gap-2">
                    <FaMapMarkerAlt className="text-primary" />
                    Shiv Mandir, Ashoka Gardan
                  </p>
                  <p className="ml-6">Ashoka Gardan, Bhopal, M.P.</p>
                </>
              )
            },
            {
              icon: <FaPhone className="text-2xl text-white" />,
              color: "bg-green-500",
              title: "Get in Touch",
              content: (
                <>
                  <p>Tel: <span className="font-semibold">(+91) 555-0132</span></p>
                  <p>Email: <span className="font-semibold">sympcare@gmail.com</span></p>
                </>
              )
            }
          ].map((item, index) => (
            <motion.div
              key={index}
              className="group p-6 bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer border border-slate-100"
              whileHover={{ y: -5 }}
            >
              <div className={`${item.color} w-12 h-12 rounded-lg mb-4 flex items-center justify-center`}>
                {item.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
              <div className="text-gray-600 space-y-2">{item.content}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Additional Contact Section */}
      <motion.div
        className="max-w-7xl mx-auto bg-gradient-to-r from-primary to-blue-600 rounded-3xl shadow-2xl p-12 text-white"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2">
            <h3 className="text-4xl font-bold mb-6">Need Immediate Assistance?</h3>
            <p className="text-lg mb-8">
              Our support team is available 24/7 to help with any urgent inquiries
              or technical issues.
            </p>
            <button className="bg-white text-primary px-8 py-4 rounded-xl font-bold hover:bg-opacity-90 transition-all duration-300">
              Emergency Support
            </button>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <FaPhone className="text-8xl opacity-25" />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Contact;