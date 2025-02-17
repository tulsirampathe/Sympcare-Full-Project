import React from "react";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Doctors from "./pages/Doctors";
import Login from "./pages/Login";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Appointment from "./pages/Appointment";
import MyAppointments from "./pages/MyAppointments";
import MyProfile from "./pages/MyProfile";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Verify from "./pages/Verify";
import Chatbot from "./components/Chatbot";
<<<<<<< HEAD
import Services from "./pages/Services";
=======
import SkinDiseaseDetector from "./pages/Skindiseas";
<<<<<<< HEAD
import Prediction from "./pages/Sas"; 

=======
>>>>>>> 2c40c6cfd2cfec1a8e7e13a9858bcfa4f4f4b29e
>>>>>>> e9b1415224d0360f3000864f761a509294af4fa8

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
        <Route path="/skin" element={<SkinDiseaseDetector />} />
        <Route path="/predict" element={<Prediction />} />



      </Routes>
      <Chatbot />
      <Footer />
    </div>
  );
};

export default App;
