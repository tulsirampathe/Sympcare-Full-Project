import React from "react";
import {
  FaCalendarCheck,
  FaHeartbeat,
  FaStethoscope,
  FaBrain,
} from "react-icons/fa";

const Services = () => {
  const services = [
    {
      title: "Hassle-Free Appointment Booking",
      text: "Easily schedule your doctor appointments online with just a few clicks.",
      icon: <FaCalendarCheck className="text-4xl text-blue-600" />,
    },
    {
      title: "Comprehensive Health Assessments",
      text: "Get accurate symptom analysis and initial diagnosis guidance.",
      icon: <FaStethoscope className="text-4xl text-green-600" />,
    },
    {
      title: "Advanced Skin Disease Detection",
      text: "AI-powered skin analysis to detect potential dermatological conditions.",
      icon: <FaHeartbeat className="text-4xl text-red-600" />,
    },
    {
      title: "Mental Health & Wellbeing Support",
      text: "Confidential mental health assessment and professional recommendations.",
      icon: <FaBrain className="text-4xl text-purple-600" />,
    },
  ];

  return (
    <section className="gap-4 py-16 px-6">
      {/* Heading */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-800">
          Our <span className="text-blue-600">Healthcare Services</span>
        </h2>
        <p className="text-gray-600 mt-2 text-lg">
          Delivering top-notch medical care and support to enhance your
          wellbeing.
        </p>
      </div>

      {/* Service Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {services.map((service, index) => (
          <div
            key={index}
            className="flex flex-col items-center p-8 bg-white shadow-lg rounded-lg cursor-pointer transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
          >
            <div className="mb-4">{service.icon}</div>
            <h3 className="text-xl font-semibold text-gray-800 text-center">
              {service.title}
            </h3>
            <p className="mt-2 text-gray-600 text-center">{service.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;
