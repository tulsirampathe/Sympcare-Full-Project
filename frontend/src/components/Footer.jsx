import React from "react";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <div className="md:mx-10">
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10  mt-40 text-sm">
        <div>
          <img className="mb-5 w-40" src={assets.logo} alt="" />
          <p className="w-full md:w-2/3 text-gray-600 leading-6">
            SympCare is an AI-driven healthcare platform that simplifies symptom
            assessment, appointment booking, and patient management for a
            seamless healthcare experience.
          </p>
        </div>

        <div>
          <p className="text-xl font-medium mb-5">COMPANY</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy policy</li>
          </ul>
        </div>

        <div>
<<<<<<< HEAD
          <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li>+91 7692057868</li>
=======
          <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
          <ul className='flex flex-col gap-2 text-gray-600'>
            <li>+1-212-459-7890</li>
>>>>>>> ff48a73d192ee82b83cc68b95594afb826565736
            <li>sympcare@gmail.com</li>
          </ul>
        </div>
      </div>

      <div>
        <hr />
<<<<<<< HEAD
        <p className="py-5 text-sm text-center">
          Copyright 2025 @ SympCare - All Right Reserved.
        </p>
=======
        <p className='py-5 text-sm text-center'>Copyright 2025 @ Sympcare.com - All Right Reserved.</p>
>>>>>>> ff48a73d192ee82b83cc68b95594afb826565736
      </div>
    </div>
  );
};

export default Footer;
