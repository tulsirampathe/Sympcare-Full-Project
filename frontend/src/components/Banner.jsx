import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Banner = () => {
  const navigate = useNavigate();
  const { token, userData } = useContext(AppContext);

  const handleBookAppointment = () => {
    const specialitySection = document.getElementById("speciality");
    if (specialitySection) {
      specialitySection.scrollIntoView({ 
        behavior: "smooth",
        block: "start"
      });
    }
  };

  const handleCreateAccount = () => {
    navigate("/login");
    scrollTo(0, 0);
  };

  return (
    <div className="flex flex-col md:flex-row bg-gradient-to-r from-blue-600 to-blue-700 rounded-3xl px-6 sm:px-8 md:px-16 py-8 md:py-12 my-6 md:mx-5 overflow-hidden relative items-center shadow-xl">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full -translate-x-16 -translate-y-16"></div>
      <div className="absolute bottom-0 right-0 w-48 h-48 bg-white/5 rounded-full translate-x-24 translate-y-24"></div>
      
      {/* ------- Left Side ------- */}
      <div className="flex-1 flex flex-col justify-center text-center md:text-left z-10">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4">
          Book Appointment
          <br />
          <span className="text-blue-100 font-semibold">
            With 100+ Trusted Doctors
          </span>
        </h1>

        <p className="text-blue-100 text-lg sm:text-xl mb-8 max-w-2xl">
          Expert medical care from trusted healthcare professionals. 
          Schedule your visit in just a few clicks.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
          {token && userData ? (
            <button
              onClick={handleBookAppointment}
              className="flex items-center justify-center gap-3 bg-white text-blue-700 font-semibold text-base sm:text-lg px-8 sm:px-10 py-4 rounded-2xl hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl active:scale-95 min-w-[200px]"
            >
              Book Appointment
              <img 
                className="w-5 h-5 transition-transform group-hover:translate-x-1" 
                src={assets.arrow_icon} 
                alt="arrow" 
              />
            </button>
          ) : (
            <>
              <button
                onClick={handleCreateAccount}
                className="bg-white text-blue-700 font-semibold text-base sm:text-lg px-8 sm:px-10 py-4 rounded-2xl hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl active:scale-95 min-w-[200px]"
              >
                Create Account
              </button>
              <button
                onClick={() => navigate("/doctors")}
                className="border-2 border-white text-white font-semibold text-base sm:text-lg px-8 sm:px-10 py-4 rounded-2xl hover:bg-white/10 transition-all duration-300 backdrop-blur-sm min-w-[200px]"
              >
                Browse Doctors
              </button>
            </>
          )}
        </div>

        {/* Trust indicators */}
        <div className="flex flex-wrap justify-center md:justify-start gap-6 mt-8 text-white/80">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            <span className="text-sm">24/7 Availability</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            <span className="text-sm">Verified Doctors</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            <span className="text-sm">Instant Confirmation</span>
          </div>
        </div>
      </div>

      {/* ------- Right Side ------- */}
      {/* Hidden on small devices (mobile), visible from medium screens up */}
      <div className="hidden md:flex relative justify-center md:justify-end w-full md:w-[45%] mt-12 md:mt-0">
        <div className="relative">
          <img
            src={assets.appointment_img}
            alt="Friendly healthcare professionals ready to help"
            className="w-[280px] sm:w-[340px] md:w-[400px] lg:w-[480px] drop-shadow-2xl"
          />
        </div>
      </div>
    </div>
  );
};

export default Banner;