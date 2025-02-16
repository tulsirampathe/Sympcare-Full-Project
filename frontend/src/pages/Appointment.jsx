import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import RelatedDoctors from "../components/RelatedDoctors";
import axios from "axios";
import { toast } from "react-toastify";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { FaCalendarAlt } from "react-icons/fa";

const Appointment = () => {
  const { docId } = useParams();
  const { doctors, currencySymbol, backendUrl, token, getDoctosData } =
    useContext(AppContext);

  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [slotTime, setSlotTime] = useState("");

  const navigate = useNavigate();

  // Fetch doctor details
  const fetchDocInfo = () => {
    const docInfo = doctors.find((doc) => doc._id === docId);
    setDocInfo(docInfo);
  };

  // Get available slots for the selected date
  const getAvailableSlots = async (date) => {
    setDocSlots([]);

    if (!docInfo) return;

    let currentDate = new Date(date);
    currentDate.setHours(10, 0, 0, 0);

    let endTime = new Date(date);
    endTime.setHours(21, 0, 0, 0);

    let timeSlots = [];

    while (currentDate < endTime) {
      let formattedTime = currentDate.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });

      let day = currentDate.getDate();
      let month = currentDate.getMonth() + 1;
      let year = currentDate.getFullYear();

      const slotDate = `${day}_${month}_${year}`;
      const isSlotAvailable =
        !docInfo.slots_booked[slotDate] ||
        !docInfo.slots_booked[slotDate].includes(formattedTime);

      if (isSlotAvailable) {
        timeSlots.push({
          datetime: new Date(currentDate),
          time: formattedTime,
        });
      }

      currentDate.setMinutes(currentDate.getMinutes() + 30);
    }

    setDocSlots(timeSlots);
  };

  // Book appointment
  const bookAppointment = async () => {
    if (!token) {
      toast.warning("Login to book an appointment");
      return navigate("/login");
    }

    if (!slotTime) {
      toast.warning("Please select a time slot");
      return;
    }

    let day = selectedDate.getDate();
    let month = selectedDate.getMonth() + 1;
    let year = selectedDate.getFullYear();
    const slotDate = `${day}_${month}_${year}`;

    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/book-appointment`,
        { docId, slotDate, slotTime },
        { headers: { token } }
      );
      if (data.success) {
        toast.success(data.message);
        getDoctosData();
        navigate("/my-appointments");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (doctors.length > 0) {
      fetchDocInfo();
    }
  }, [doctors, docId]);

  useEffect(() => {
    if (docInfo) {
      getAvailableSlots(selectedDate);
    }
  }, [docInfo, selectedDate]);

  return docInfo ? (
    <div className="space-y-8">
      {/* Doctor Details */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div>
          <img
            className="bg-primary w-full sm:max-w-72 rounded-lg"
            src={docInfo.image}
            alt=""
          />
        </div>

        <div className="flex-1 border border-[#ADADAD] rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0">
          {/* ----- Doc Info ----- */}
          <p className="flex items-center gap-2 text-3xl font-medium text-gray-700">
            {docInfo.name}{" "}
            <img className="w-5" src={assets.verified_icon} alt="" />
          </p>
          <div className="flex items-center gap-2 mt-1 text-gray-600">
            <p>
              {docInfo.degree} - {docInfo.speciality}
            </p>
            <button className="py-0.5 px-2 border text-xs rounded-full">
              {docInfo.experience}
            </button>
          </div>

          {/* ----- Doc About ----- */}
          <div>
            <p className="flex items-center gap-1 text-sm font-medium text-[#262626] mt-3">
              About <img className="w-3" src={assets.info_icon} alt="" />
            </p>
            <p className="text-sm text-gray-600 max-w-[700px] mt-1">
              {docInfo.about}
            </p>
          </div>

          <p className="text-gray-600 font-medium mt-4">
            Appointment fee:{" "}
            <span className="text-gray-800">
              {currencySymbol}
              {docInfo.fees}
            </span>
          </p>
        </div>
      </div>

      {/* Booking Slots Section */}
      <div className="p-6 bg-white shadow-2xl rounded-lg border border-gray-200">
        <h2 className="text-gray-800 text-2xl font-bold flex items-center gap-2">
          <FaCalendarAlt className="text-blue-500" /> Select Date & Time
        </h2>

        <div className="flex flex-col md:flex-row gap-6 mt-6">
          {/* Left Side: Full Calendar */}
          <div className="md:w-1/2">
            <p className="text-gray-600 mb-2 font-medium">Select a date:</p>
            <Calendar
              onChange={setSelectedDate}
              value={selectedDate}
              minDate={new Date()}
              className="border border-gray-300 rounded-md p-2 w-full"
            />
          </div>

          {/* Right Side: Time Slot Grid */}
          <div className="md:w-1/2">
            <p className="text-gray-600 mb-2 font-medium">
              Select a time slot:
            </p>
            {docSlots.length > 0 ? (
              <div className="grid grid-cols-3 gap-4 max-h-64 overflow-y-auto pr-2">
                {docSlots.map((slot, index) => (
                  <div
                    key={index}
                    onClick={() => setSlotTime(slot.time)}
                    className={`flex items-center justify-center px-4 py-2 rounded-full cursor-pointer transition-transform duration-300 ${
                      slot.time === slotTime
                        ? "bg-blue-600 text-white shadow-lg transform scale-105"
                        : "border border-gray-300 text-gray-600 hover:bg-blue-50"
                    }`}
                  >
                    <span className="text-sm">{slot.time}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6">
                <p className="text-gray-500 font-medium">
                  No available slots for the selected date.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Booking Button */}
        <div className="mt-8 flex justify-center">
          <button
            onClick={bookAppointment}
            className="bg-blue-600 text-white font-semibold px-10 py-3 rounded-full hover:bg-blue-700 transition-colors duration-300"
          >
            Book Appointment
          </button>
        </div>
      </div>

      {/* Related Doctors */}
      <RelatedDoctors speciality={docInfo.speciality} docId={docId} />
    </div>
  ) : null;
};

export default Appointment;
