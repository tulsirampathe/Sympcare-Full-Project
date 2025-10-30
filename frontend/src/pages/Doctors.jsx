import React, { useContext, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AppContext } from "../context/AppContext";
import { useNavigate, useParams } from "react-router-dom";
import { FaUserMd, FaChevronLeft, FaChevronRight, FaFilter } from "react-icons/fa";

const Doctors = () => {
  const { speciality } = useParams();
  const { doctors } = useContext(AppContext);
  const [filterDoc, setFilterDoc] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  const filters = [
    "General physician",
    "Gynecologist",
    "Dermatologist",
    "Pediatricians",
    "Neurologist",
    "Gastroenterologist",
  ];

  // Show 6 doctors per page
  const doctorsPerPage = 6;
  const totalPages = Math.ceil(filterDoc.length / doctorsPerPage);
  const indexOfLastDoctor = currentPage * doctorsPerPage;
  const indexOfFirstDoctor = indexOfLastDoctor - doctorsPerPage;
  const currentDoctors = filterDoc.slice(indexOfFirstDoctor, indexOfLastDoctor);

  const applyFilter = () => {
    if (speciality) {
      setFilterDoc(doctors.filter((doc) => doc.speciality === speciality));
    } else {
      setFilterDoc(doctors);
    }
    setCurrentPage(1);
  };

  useEffect(() => {
    applyFilter();
  }, [doctors, speciality]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-10"
      >
        <h1 className="text-3xl font-semibold text-gray-800 flex justify-center items-center gap-3">
          <FaUserMd className="text-blue-600" /> Our Specialist Doctors
        </h1>
        <p className="text-gray-600 mt-2">
          Browse through our doctors by speciality and book appointments easily.
        </p>
      </motion.div>

      <div className="flex flex-col sm:flex-row gap-8 relative">
        {/* Filter Sidebar for Desktop */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="hidden sm:flex flex-col gap-3 text-sm text-gray-600 w-1/4"
        >
          {filters.map((item, index) => (
            <motion.p
              key={index}
              whileHover={{ scale: 1.02 }}
              onClick={() =>
                speciality === item
                  ? navigate("/doctors")
                  : navigate(`/doctors/${item}`)
              }
              className={`cursor-pointer border border-gray-300 rounded-md py-2 px-3 transition-all ${
                speciality === item
                  ? "bg-blue-100 text-blue-700 font-medium"
                  : "hover:bg-gray-100"
              }`}
            >
              {item}
            </motion.p>
          ))}
        </motion.div>

        {/* Mobile Filter Button */}
        <button
          onClick={() => setShowFilter(true)}
          className="sm:hidden flex items-center gap-2 py-2 px-4 mb-3 border rounded-md text-sm text-gray-700 bg-white shadow-sm"
        >
          <FaFilter /> Filters
        </button>

        {/* Filter Drawer (Mobile) */}
        <AnimatePresence>
          {showFilter && (
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.3 }}
              className="fixed top-0 left-0 h-full w-64 bg-white shadow-2xl z-50 p-5 overflow-y-auto"
            >
              <h2 className="text-lg font-semibold mb-4 flex justify-between items-center">
                Filters
                <button
                  onClick={() => setShowFilter(false)}
                  className="text-gray-500 text-sm hover:text-gray-700"
                >
                  ✕
                </button>
              </h2>
              {filters.map((item, index) => (
                <p
                  key={index}
                  onClick={() => {
                    speciality === item
                      ? navigate("/doctors")
                      : navigate(`/doctors/${item}`);
                    setShowFilter(false);
                  }}
                  className={`cursor-pointer border border-gray-300 rounded-md py-2 px-3 mt-2 transition-all ${
                    speciality === item
                      ? "bg-blue-100 text-blue-700 font-medium"
                      : "hover:bg-gray-100"
                  }`}
                >
                  {item}
                </p>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Doctors Grid */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full sm:w-3/4"
        >
          {currentDoctors.length > 0 ? (
            <>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentDoctors.map((item, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ y: -6 }}
                    className="bg-white shadow-md rounded-2xl overflow-hidden border border-gray-200 cursor-pointer transition-all"
                    onClick={() => {
                      navigate(`/appointment/${item._id}`);
                      scrollTo(0, 0);
                    }}
                  >
                    <div className="h-40 bg-gray-100 flex items-center justify-center overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full object-cover"
                      />
                    </div>
                    <div className="p-4 space-y-1">
                      <div
                        className={`flex items-center gap-2 text-sm ${
                          item.available ? "text-green-500" : "text-gray-500"
                        }`}
                      >
                        <span
                          className={`w-2 h-2 rounded-full ${
                            item.available ? "bg-green-500" : "bg-gray-400"
                          }`}
                        ></span>
                        {item.available ? "Available" : "Not Available"}
                      </div>
                      <h2 className="text-lg font-semibold text-gray-800">
                        {item.name}
                      </h2>
                      <p className="text-gray-600 text-sm">{item.speciality}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Pagination */}
              <div className="flex justify-center items-center gap-4 mt-8">
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                  className={`flex items-center gap-1 px-4 py-2 border rounded-md text-sm ${
                    currentPage === 1
                      ? "text-gray-400 border-gray-200 cursor-not-allowed"
                      : "text-blue-600 border-blue-300 hover:bg-blue-50"
                  }`}
                >
                  <FaChevronLeft /> Previous
                </button>
                <p className="text-gray-600 text-sm">
                  Page {currentPage} of {totalPages}
                </p>
                <button
                  onClick={() =>
                    setCurrentPage((prev) =>
                      Math.min(prev + 1, totalPages)
                    )
                  }
                  disabled={currentPage === totalPages}
                  className={`flex items-center gap-1 px-4 py-2 border rounded-md text-sm ${
                    currentPage === totalPages
                      ? "text-gray-400 border-gray-200 cursor-not-allowed"
                      : "text-blue-600 border-blue-300 hover:bg-blue-50"
                  }`}
                >
                  Next <FaChevronRight />
                </button>
              </div>
            </>
          ) : (
            <p className="text-gray-500 text-center py-10">
              No doctors found for this speciality.
            </p>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Doctors;
