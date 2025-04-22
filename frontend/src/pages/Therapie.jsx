// Therapie.jsx
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Therapie = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { therapy } = location.state || {}; // fallback if no state passed

  if (!therapy) {
    return (
      <div className="text-center mt-10">
        <h2 className="text-xl text-red-600">No therapy data provided.</h2>
        <button
          className="mt-4 px-4 py-2 bg-green-600 text-white rounded"
          onClick={() => navigate(-1)}
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <img
        src={therapy.image}
        alt={therapy.title}
        className="w-full h-60 object-cover rounded mb-6"
      />
      <h1 className="text-3xl font-bold text-green-800">{therapy.title}</h1>
      <p className="text-gray-700 mt-4">{therapy.description}</p>
      <p className="mt-4 text-emerald-700 font-medium">🌿 Use: {therapy.use}</p>
      <button
        onClick={() => navigate(-1)}
        className="mt-6 px-4 py-2 bg-lime-600 text-white rounded"
      >
        Back to List
      </button>
    </div>
  );
};

export default Therapie;
