import React, { useContext, useEffect, useState } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets";
import ChatWithDoctor from "../../components/ChatWithDoctor";
import { FaVideo } from "react-icons/fa";

const DoctorAppointments = () => {
  const {
    dToken,
    appointments,
    getAppointments,
    cancelAppointment,
    completeAppointment,
  } = useContext(DoctorContext);

  const { slotDateFormat, calculateAge, currency } = useContext(AppContext);

  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [chatOpen, setChatOpen] = useState(false);

  useEffect(() => {
    if (dToken) getAppointments();
  }, [dToken]);

  const openChat = (appointment) => {
    setSelectedAppointment(appointment);
    setChatOpen(true);
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6">
      <h2 className="mb-4 text-xl font-semibold text-gray-700">
        All Appointments
      </h2>

      <div className="bg-white border rounded-xl shadow-sm overflow-hidden">
        {/* -------- Desktop Header -------- */}
        <div className="hidden md:grid grid-cols-[0.5fr_2fr_1fr_1fr_2fr_1fr_1.5fr_1fr] gap-3 py-3 px-6 border-b bg-gray-100 text-gray-600 text-sm font-medium">
          <p>#</p>
          <p>Patient</p>
          <p>Payment</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Fees</p>
          <p>Consultation</p>
          <p>Actions</p>
        </div>

        {appointments.map((item, index) => (
          <div
            key={index}
            className="border-b hover:bg-gray-50 transition"
          >
            {/* -------- Desktop Row -------- */}
            <div className="hidden md:grid grid-cols-[0.5fr_2fr_1fr_1fr_2fr_1fr_1.5fr_1fr] gap-3 items-center text-gray-700 py-4 px-6">
              <p>{index + 1}</p>

              {/* Patient */}
              <div className="flex items-center gap-3">
                <img
                  src={item.userData.image}
                  className="w-10 h-10 rounded-full object-cover border"
                  alt="patient"
                />
                <div>
                  <p className="font-medium">{item.userData.name}</p>
                  <p className="text-xs text-gray-500">{item.userData.email}</p>
                </div>
              </div>

              {/* Payment */}
              <div>
                <span
                  className={`text-xs px-3 py-1 rounded-full font-medium ${
                    item.payment
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {item.payment ? "Online" : "Cash"}
                </span>
              </div>

              {/* Age */}
              <p>{calculateAge(item.userData.dob)} yrs</p>

              {/* Date & Time */}
              <div>
                <p className="font-medium">
                  {slotDateFormat(item.slotDate)} | {item.slotTime}
                </p>
              </div>

              {/* Fees */}
              <p className="font-semibold">
                {currency}
                {item.amount}
              </p>

              {/* Consultation Mode + Zoom */}
              <div className="flex flex-col gap-1">
                <span
                  className={`text-xs px-3 py-1 rounded-full w-fit ${
                    item.consultationMode === "online"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-purple-100 text-purple-700"
                  }`}
                >
                  {item.consultationMode === "online"
                    ? "Online Consultation"
                    : "Offline Consultation"}
                </span>

                {item.consultationMode === "online" &&
                  item.payment &&
                  item.zoomJoinUrl && (
                    <a
                      href={item.zoomJoinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-xs text-blue-600 hover:underline mt-1"
                    >
                      <FaVideo className="text-blue-500" /> Join Zoom
                    </a>
                  )}
              </div>

              {/* Action + Chat */}
              <div className="flex flex-col gap-2 items-start">
                {item.cancelled ? (
                  <span className="text-red-500 text-sm font-medium">
                    Cancelled
                  </span>
                ) : item.isCompleted ? (
                  <span className="text-green-600 text-sm font-medium">
                    Completed
                  </span>
                ) : (
                  <div className="flex gap-2">
                    <img
                      onClick={() => cancelAppointment(item._id)}
                      className="w-8 cursor-pointer hover:opacity-80"
                      src={assets.cancel_icon}
                      alt="Cancel"
                    />
                    <img
                      onClick={() => completeAppointment(item._id)}
                      className="w-8 cursor-pointer hover:opacity-80"
                      src={assets.tick_icon}
                      alt="Complete"
                    />
                  </div>
                )}

                <button
                  onClick={() => openChat(item)}
                  className="bg-primary text-white text-xs px-3 py-1.5 rounded-lg hover:bg-blue-600 transition w-full"
                >
                  Chat
                </button>
              </div>
            </div>

            {/* -------- Mobile Card View -------- */}
            <div className="md:hidden flex flex-col gap-2 p-4 text-sm text-gray-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={item.userData.image}
                    className="w-10 h-10 rounded-full object-cover border"
                    alt="patient"
                  />
                  <div>
                    <p className="font-medium">{item.userData.name}</p>
                    <p className="text-xs text-gray-500">
                      {item.userData.email}
                    </p>
                  </div>
                </div>
                <span
                  className={`text-xs px-3 py-1 rounded-full font-medium ${
                    item.payment
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {item.payment ? "Online" : "Cash"}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 mt-2">
                <p>
                  <span className="font-semibold">Age:</span>{" "}
                  {calculateAge(item.userData.dob)} yrs
                </p>
                <p>
                  <span className="font-semibold">Fees:</span> {currency}
                  {item.amount}
                </p>
                <p className="col-span-2">
                  <span className="font-semibold">Date & Time:</span>{" "}
                  {slotDateFormat(item.slotDate)} | {item.slotTime}
                </p>
                <p className="col-span-2">
                  <span className="font-semibold">Consultation:</span>{" "}
                  {item.consultationMode === "online"
                    ? "Online"
                    : "Offline"}
                </p>
                {item.consultationMode === "online" &&
                  item.payment &&
                  item.zoomJoinUrl && (
                    <a
                      href={item.zoomJoinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-blue-600 hover:underline text-xs mt-1"
                    >
                      <FaVideo className="text-blue-500" /> Join Zoom Meeting
                    </a>
                  )}
              </div>

              <div className="flex justify-between items-center mt-3">
                {item.cancelled ? (
                  <span className="text-red-500 text-sm font-medium">
                    Cancelled
                  </span>
                ) : item.isCompleted ? (
                  <span className="text-green-600 text-sm font-medium">
                    Completed
                  </span>
                ) : (
                  <div className="flex gap-2">
                    <img
                      onClick={() => cancelAppointment(item._id)}
                      className="w-8 cursor-pointer hover:opacity-80"
                      src={assets.cancel_icon}
                      alt="Cancel"
                    />
                    <img
                      onClick={() => completeAppointment(item._id)}
                      className="w-8 cursor-pointer hover:opacity-80"
                      src={assets.tick_icon}
                      alt="Complete"
                    />
                  </div>
                )}

                <button
                  onClick={() => openChat(item)}
                  className="bg-primary text-white text-xs px-3 py-1.5 rounded-lg hover:bg-blue-600 transition"
                >
                  Chat
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ✅ Chat Popup */}
      {chatOpen && selectedAppointment && (
        <ChatWithDoctor
          appointment={selectedAppointment}
          isOpen={chatOpen}
          setChatOpen={setChatOpen}
        />
      )}
    </div>
  );
};

export default DoctorAppointments;
