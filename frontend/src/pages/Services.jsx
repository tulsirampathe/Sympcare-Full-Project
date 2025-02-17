import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FaCalendarCheck,
  FaHeartbeat,
  FaStethoscope,
  FaBrain,
} from "react-icons/fa";

const Services = () => {
  const navigate = useNavigate();

  const services = [
    {
      title: "Hassle-Free Appointment Booking",
      text: "Easily schedule your doctor appointments online with just a few clicks.",
      icon: <FaCalendarCheck className="text-4xl text-blue-600" />,
      route: "/appointment",
    },
    {
      title: "Comprehensive Health Assessments",
      text: "Get accurate symptom analysis and initial diagnosis guidance.",
      icon: <FaStethoscope className="text-4xl text-green-600" />,
      route: "/symptom-analysis",
    },
    {
      title: "Advanced Skin Disease Detection",
      text: "AI-powered skin analysis to detect potential dermatological conditions.",
      icon: <FaHeartbeat className="text-4xl text-red-600" />,
      route: "/skin-detection",
    },
    {
      title: "Mental Health & Wellbeing Support",
      text: "Confidential mental health assessment and professional recommendations.",
      icon: <FaBrain className="text-4xl text-purple-600" />,
      route: "/health-assessment",
    },
  ];

  return (
    <section className="px-6">
      {/* Centered Section Heading */}
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-800">
          Our <span className="text-primary">Healthcare Services</span>
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto mt-3">
          Delivering top-notch medical care and support to enhance your
          wellbeing.
        </p>
      </div>

      {/* Service Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {services.map((service, index) => (
          <div
            key={index}
            onClick={() => {
              navigate(service.route);
              scrollTo(0, 0);
            }}
            className="flex flex-col items-center p-8 bg-white shadow-lg rounded-lg cursor-pointer transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
          >
            <div className="mb-6">{service.icon}</div>
            <h3 className="text-xl font-semibold text-gray-800 text-center">
              {service.title}
            </h3>
            <p className="mt-3 text-gray-600 text-center">{service.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;
