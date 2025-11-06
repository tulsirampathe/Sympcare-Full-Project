import React from "react";
import { assets } from "../assets/assets";

const Header = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between bg-gradient-to-r from-blue-600 to-blue-700 rounded-3xl lg:mt-12 px-6 sm:px-10 lg:px-16 py-8 md:py-10 overflow-hidden relative shadow-xl">
      {/* Decorative Backgrounds */}
      <div className="absolute top-0 left-0 w-24 h-24 bg-white/10 rounded-full -translate-x-10 -translate-y-10"></div>
      <div className="absolute bottom-0 right-0 w-40 h-40 bg-white/5 rounded-full translate-x-16 translate-y-16"></div>

      {/* --------- Left Section --------- */}
      <div className="flex-1 flex flex-col justify-center gap-4 text-center md:text-left z-10">
        <h1 className="text-2xl sm:text-3xl lg:text-5xl text-white font-bold leading-snug">
          SympCare – Your Complete Digital Health Companion
        </h1>

        <div className="flex flex-col md:flex-row items-center md:items-start gap-3 text-blue-100 text-sm sm:text-base font-light">
          <img className="w-24" src={assets.group_profiles} alt="group_profiles" />
          <p className="max-w-md">
            AI-driven health assessments, skin disease detection, mental wellness support,
            and doctor consultations — all in one place.
          </p>
        </div>

        <a
          href="#services"
          className="inline-flex items-center justify-center gap-2 bg-white text-blue-700 font-semibold text-sm sm:text-base px-6 py-3 rounded-2xl hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg active:scale-95 self-center md:self-start"
        >
          Our Services
          <img className="w-3.5 h-3.5" src={assets.arrow_icon} alt="arrow" />
        </a>
      </div>

      {/* --------- Right Section --------- */}
      <div className="flex-1 flex justify-center md:justify-end mt-8 z-10">
        <img
          src={assets.header_img}
          alt="Header visual"
          className="w-[240px] sm:w-[300px] md:w-[360px] lg:w-[420px] drop-shadow-2xl"
        />
      </div>
    </div>
  );
};

export default Header;
