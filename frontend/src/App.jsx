import React from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Chatbot from "./components/Chatbot";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import About from "./pages/About";
import Appointment from "./pages/Appointment";
import Contact from "./pages/Contact";
import Doctors from "./pages/Doctors";
import Home from "./pages/Home";
import Login from "./pages/Login";
import MyAppointments from "./pages/MyAppointments";
import MyProfile from "./pages/MyProfile";
import Verify from "./pages/Verify";

import Services from "./pages/Services";

import SkinDiseaseDetector from "./pages/SkinDiseaseDetector";

import MentalHealthAssessment from "./pages/MentalHealthAssessment";
import SymptomAnalysis from "./pages/SymptomAnalysis";
import HealthEducation from "./components/HealthEducation";

const App = () => {
  return (
    <div className="mx-4 sm:mx-[10%]">
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/services" element={<Services />} />
        <Route path="/doctors/:speciality" element={<Doctors />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/appointment/:docId" element={<Appointment />} />
        <Route path="/my-appointments" element={<MyAppointments />} />
        <Route path="/my-profile" element={<MyProfile />} />
        <Route path="/verify" element={<Verify />} />
        <Route path="/skin-detection" element={<SkinDiseaseDetector />} />
        <Route path="/symptom-analysis" element={<SymptomAnalysis />} />
        <Route path="/health-assessment" element={<MentalHealthAssessment />} />
        <Route path="/health-education" element={<HealthEducation />} />
      </Routes>
      <Chatbot />
      <Footer />
    </div>
  );
};

export default App;
