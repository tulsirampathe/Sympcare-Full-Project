import React, { useState } from "react";
import {
  FaUser,
  FaCalendarAlt,
  FaMale,
  FaFemale,
  FaBriefcase,
  FaHeart,
  FaBed,
  FaSmile,
  FaBrain,
} from "react-icons/fa";

const MentalHealthAssessment = () => {
  const [formData, setFormData] = useState({
    age: "",
    gender: "",
    employmentStatus: "",
    familyHistory: "",
    Q1: "",
    Q2: "",
    Q3: "",
    Q4: "",
    Q5: "",
    Q6: "",
    Q7: "",
    Q8: "",
    Q9: "",
    Q10: "",
    Q11: "",
    Q12: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form Submitted", formData);
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-full max-w-4xl bg-white p-8 rounded-lg shadow-xl">
        <h1 className="text-3xl font-semibold text-center text-blue-600 mb-6">
          Mental Health Assessment
        </h1>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 overflow-auto max-h-screen"
        >
          {/* Age Input */}
          <div className="flex items-center space-x-2">
            <FaUser className="text-blue-600" />
            <div>
              <label htmlFor="age" className="text-lg font-medium">
                Age:
              </label>
              <input
                type="number"
                id="age"
                name="age"
                value={formData.age}
                onChange={handleChange}
                min="0"
                required
                className="mt-2 p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Gender Selection */}
          <div className="flex items-center space-x-2">
            <FaMale className="text-blue-600" />
            <div>
              <label htmlFor="gender" className="text-lg font-medium">
                Gender:
              </label>
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
                className="mt-2 p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          {/* Employment Status */}
          <div className="flex items-center space-x-2">
            <FaBriefcase className="text-blue-600" />
            <div>
              <label htmlFor="employmentStatus" className="text-lg font-medium">
                Employment Status:
              </label>
              <select
                id="employmentStatus"
                name="employmentStatus"
                value={formData.employmentStatus}
                onChange={handleChange}
                required
                className="mt-2 p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Employed">Employed</option>
                <option value="Unemployed">Unemployed</option>
                <option value="Student">Student</option>
              </select>
            </div>
          </div>

          {/* Family History of Mental Illness */}
          <div className="flex items-center space-x-2">
            <FaHeart className="text-blue-600" />
            <div>
              <label htmlFor="familyHistory" className="text-lg font-medium">
                Family History of Mental Illness:
              </label>
              <select
                id="familyHistory"
                name="familyHistory"
                value={formData.familyHistory}
                onChange={handleChange}
                required
                className="mt-2 p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
          </div>

          {/* Questions with Icons */}
          {[...Array(12)].map((_, index) => {
            const questionNumber = index + 1;
            const questionIcons = [
              <FaBed className="text-blue-600" />,
              <FaBrain className="text-blue-600" />,
              <FaSmile className="text-blue-600" />,
              <FaHeart className="text-blue-600" />,
              <FaUser className="text-blue-600" />,
            ];

            return (
              <div key={questionNumber} className="flex items-center space-x-2">
                {questionIcons[index % questionIcons.length]}
                <div>
                  <label
                    htmlFor={`Q${questionNumber}`}
                    className="text-lg font-medium"
                  >
                    {`Q${questionNumber}: Do you feel ${
                      index % 2 === 0 ? "nervous" : "fatigued"
                    }?`}
                  </label>
                  <input
                    type="number"
                    id={`Q${questionNumber}`}
                    name={`Q${questionNumber}`}
                    value={formData[`Q${questionNumber}`]}
                    onChange={handleChange}
                    min="1"
                    max="5"
                    required
                    className="mt-2 p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            );
          })}

          {/* Submit Button */}
          <button
            type="submit"
            className="col-span-2 mt-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default MentalHealthAssessment;
