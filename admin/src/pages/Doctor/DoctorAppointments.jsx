import React, { useContext, useEffect, useState } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets";
import ChatWithDoctor from "../../components/ChatWithDoctor"; // ✅ Reuse same chat component

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
    if (dToken) {
      getAppointments();
    }
  }, [dToken]);

  const openChat = (appointment) => {
    setSelectedAppointment(appointment);
    setChatOpen(true);
  };

  return (
    <div className="w-full max-w-6xl m-5">
      <p className="mb-3 text-lg font-medium">All Appointments</p>

      <div className="bg-white border rounded text-sm max-h-[80vh] overflow-y-scroll">
        <div className="max-sm:hidden grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr_1fr] gap-1 py-3 px-6 border-b">
          <p>#</p>
          <p>Patient</p>
          <p>Payment</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Fees</p>
          <p>Action</p>
          <p>Chat</p>
        </div>

        {appointments.map((item, index) => (
          <div
            key={index}
            className="flex flex-wrap justify-between max-sm:gap-5 max-sm:text-base sm:grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr_1fr] gap-1 items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-50"
          >
            <p className="max-sm:hidden">{index + 1}</p>

            <div className="flex items-center gap-2">
              <img
                src={item.userData.image}
                className="w-8 h-8 rounded-full object-cover"
                alt=""
              />
              <p>{item.userData.name}</p>
            </div>

            <div>
              <p className="text-xs inline border border-primary px-2 rounded-full">
                {item.payment ? "Online" : "CASH"}
              </p>
            </div>

            <p className="max-sm:hidden">{calculateAge(item.userData.dob)}</p>
            <p>
              {slotDateFormat(item.slotDate)}, {item.slotTime}
            </p>
            <p>
              {currency}
              {item.amount}
            </p>

            {/* Action Buttons */}
            {item.cancelled ? (
              <p className="text-red-400 text-xs font-medium">Cancelled</p>
            ) : item.isCompleted ? (
              <p className="text-green-500 text-xs font-medium">Completed</p>
            ) : (
              <div className="flex">
                <img
                  onClick={() => cancelAppointment(item._id)}
                  className="w-10 cursor-pointer"
                  src={assets.cancel_icon}
                  alt=""
                />
                <img
                  onClick={() => completeAppointment(item._id)}
                  className="w-10 cursor-pointer"
                  src={assets.tick_icon}
                  alt=""
                />
              </div>
            )}

            {/* Chat Button */}
            <div>
              <button
                onClick={() => openChat(item)}
                className="bg-primary text-white px-3 py-1 rounded-lg hover:bg-blue-600 transition"
              >
                Chat
              </button>
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
