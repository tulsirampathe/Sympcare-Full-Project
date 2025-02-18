import React, { useState, useContext } from "react";
import { DoctorContext } from "../context/DoctorContext";

const SendSmsSection = () => {
  const { sendSms } = useContext(DoctorContext);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState("");

  const handleSendMessage = () => {
    sendSms(phoneNumber, message);
    setPhoneNumber("");
    setMessage("");
  };

  return (
    <div className="bg-white p-5 rounded shadow-md w-72 mb-5 border">
      <h3 className="text-lg font-semibold mb-3">📩 Send SMS</h3>
      <input
        type="text"
        placeholder="Enter Phone Number"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        className="border p-2 w-full mb-2 rounded"
      />
      <textarea
        placeholder="Enter Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="border p-2 w-full mb-2 rounded"
      />
      <button
        onClick={handleSendMessage}
        className="bg-blue-500 text-white p-2 w-full rounded hover:bg-blue-600"
      >
        Send SMS
      </button>
    </div>
  );
};

export default SendSmsSection;
