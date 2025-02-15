import React from "react";
import { assets } from "../assets/assets";

const About = () => {
  return (
    <div className="px-4 md:px-10 lg:px-20">
      <div className="text-center text-2xl pt-10 text-[#707070]">
        <p>
          ABOUT <span className="text-gray-700 font-semibold">US</span>
        </p>
      </div>

<<<<<<< HEAD
      <div className="my-10 flex flex-col md:flex-row items-center gap-12">
        {/* Improved Image Container */}
        <div className="flex justify-center md:w-1/2">
          <img
            className="w-full max-w-md rounded-lg shadow-lg object-contain md:object-cover"
            src={assets.about_image}
            alt="About SympCare"
          />
        </div>

        {/* Text Content */}
        <div className="flex flex-col justify-center gap-6 md:w-1/2 text-sm text-gray-600">
          <b>
            Welcome to SympCare, your intelligent healthcare assistant dedicated
            to simplifying patient care and medical management.
          </b>
          <p>
            At SympCare, we understand the challenges patients face when it
            comes to assessing symptoms, booking appointments, and staying on
            top of their health. Our AI-driven platform streamlines healthcare
            access by offering real-time symptom analysis, smart appointment
            scheduling, and personalized health insights.
          </p>
          <b className="text-gray-800">Empowering Smarter Healthcare</b>
          <p>
            SympCare integrates advanced AI and machine learning to deliver a
            seamless healthcare experience. Whether you're a patient looking for
            quick symptom assessment or a doctor managing appointments, our
            platform ensures efficiency, accuracy, and convenience. With
            real-time data synchronization and intelligent health
            recommendations, we bridge the gap between patients and healthcare
            providers.
          </p>
          <b className="text-gray-800">Our Vision</b>
          <p>
            Our vision at SympCare is to revolutionize healthcare accessibility
            by combining AI-driven diagnostics with intuitive patient care
            solutions. We aim to enhance healthcare efficiency, reduce wait
            times, and provide proactive health management—ensuring that every
            individual gets the right care at the right time.
          </p>
=======
      <div className='my-10 flex flex-col md:flex-row gap-12'>
        <img className='w-full md:max-w-[360px]' src={assets.about_image} alt="" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-sm text-gray-600'>
          <p>Welcome to Sympcare, your trusted partner in managing your healthcare needs conveniently and efficiently. At Sympcare, we understand the challenges individuals face when it comes to scheduling doctor appointments and managing their health records.</p>
          <p>Sympcare is committed to excellence in healthcare technology. We continuously strive to enhance our platform, integrating the latest advancements to improve user experience and deliver superior service. Whether you're booking your first appointment or managing ongoing care, Sympcare is here to support you every step of the way.</p>
          <b className='text-gray-800'>Our Vision</b>
          <p>Our vision at Sympcare is to create a seamless healthcare experience for every user. We aim to bridge the gap between patients and healthcare providers, making it easier for you to access the care you need, when you need it.</p>
>>>>>>> ff48a73d192ee82b83cc68b95594afb826565736
        </div>
      </div>

      <div className="text-xl my-4">
        <p>
          WHY <span className="text-gray-700 font-semibold">CHOOSE US</span>
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-6 mb-20">
        <div className="border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer">
          <b>EFFICIENCY:</b>
          <p>
            Streamlined appointment scheduling that fits into your busy
            lifestyle.
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer">
          <b>CONVENIENCE:</b>
          <p>
            Access to a network of trusted healthcare professionals in your
            area.
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer">
          <b>PERSONALIZATION:</b>
          <p>
            Tailored recommendations and reminders to help you stay on top of
            your health.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
