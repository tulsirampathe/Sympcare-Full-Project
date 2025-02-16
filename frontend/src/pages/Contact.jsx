import React from "react";
import { assets } from "../assets/assets";

const Contact = () => {
  return (
    <div className="px-6 md:px-12 lg:px-24">
      {/* Section Title */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-800">
          CONTACT <span className="text-primary">US</span>
        </h2>
        <p className="text-gray-600 mt-2">We'd love to hear from you!</p>
      </div>

      {/* Content Section */}
      <div className="mt-12 flex flex-col md:flex-row items-center gap-12">
        {/* Image Section */}
        <div className="md:w-1/2 flex justify-center">
          <img
            className="w-full max-w-md bg-primary rounded-lg shadow-xl hover:scale-105 transition-transform duration-300"
            src={assets.contact_image}
            alt="Contact SympCare"
          />
        </div>

        {/* Contact Details */}
        <div className="md:w-1/2 text-gray-700 space-y-6">
          <div>
            <h3 className="text-xl font-semibold text-gray-800">OUR OFFICE</h3>
            <p className="text-gray-600 mt-2">
              Shiv Mandir, Ashoka Gardan <br />
              Ashoka Gardan, Bhopal, M.P.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-800">GET IN TOUCH</h3>
            <p className="text-gray-600 mt-2">
              Tel: <span className="font-semibold">(+91) 555-0132</span> <br />
              Email: <span className="font-semibold">sympcare@gmail.com</span>
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-800">CAREERS AT SYMPCARE</h3>
            <p className="text-gray-600 mt-2">
              Learn more about our teams and job openings.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
