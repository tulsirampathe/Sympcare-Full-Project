import React from "react";
import { assets } from "../assets/assets";

const About = () => {
  return (
    <div className="px-6 md:px-12 lg:px-24">
      {/* Section Title */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-800">
          ABOUT <span className="text-primary">US</span>
        </h2>
        <p className="text-gray-600 mt-2">
          Your intelligent healthcare assistant
        </p>
      </div>

      {/* Content Section */}
      <div className="mt-12 flex flex-col md:flex-row items-center gap-12">
        {/* Image Section */}
        <div className="md:w-1/2 flex justify-center">
          <img
            className="w-full max-w-md bg-primary rounded-lg shadow-xl hover:scale-105 transition-transform duration-300"
            src={assets.about_image}
            alt="About SympCare"
          />
        </div>

        {/* Text Content */}
        <div className="md:w-1/2 text-gray-700 space-y-6">
          <h3 className="text-2xl font-semibold text-gray-800">
            Welcome to <span className="text-blue-600">SympCare</span>
          </h3>
          <p>
            We simplify patient care and medical management through AI-driven
            real-time symptom analysis, smart appointment scheduling, and
            personalized health insights.
          </p>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-gray-800">
                Empowering Smarter Healthcare
              </h4>
              <p>
                Our platform integrates AI and machine learning to streamline
                healthcare access, helping both patients and healthcare
                providers.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800">Our Vision</h4>
              <p>
                We aim to revolutionize healthcare accessibility with AI-driven
                diagnostics, reducing wait times and enhancing proactive health
                management.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="text-center mt-16">
        <h2 className="text-3xl font-bold text-gray-800">
          WHY <span className="text-primary">CHOOSE US?</span>
        </h2>
      </div>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          {
            title: "EFFICIENCY",
            text: "Streamlined appointment scheduling for your busy lifestyle.",
          },
          {
            title: "CONVENIENCE",
            text: "Access trusted healthcare professionals in your area.",
          },
          {
            title: "PERSONALIZATION",
            text: "Tailored recommendations and health reminders.",
          },
        ].map((item, index) => (
          <div
            key={index}
            className="border p-8 rounded-lg text-center bg-white shadow-md hover:bg-primary hover:text-white transition-all duration-300 cursor-pointer"
          >
            <h3 className="text-xl font-semibold">{item.title}</h3>
            <p className="mt-2 text-gray-600 group-hover:text-white">
              {item.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default About;
