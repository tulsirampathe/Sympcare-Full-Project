import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import { IoMdChatbubbles } from "react-icons/io";
import ChatWithDoctor from "../components/ChatWithDoctor";
import { motion } from "framer-motion";
import { Calendar, Video, CheckCircle, AlertCircle } from "lucide-react";

const MyAppointments = () => {
  const { backendUrl, token, userData } = useContext(AppContext);
  const navigate = useNavigate();

  const [appointments, setAppointments] = useState([]);
  const [payment, setPayment] = useState("");
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [successfulPayments, setSuccessfulPayments] = useState(new Set());

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split("_");
    return `${dateArray[0]} ${months[Number(dateArray[1])]} ${dateArray[2]}`;
  };

  // Add this helper function to parse the date for comparison
  const parseSlotDate = (slotDate) => {
    const [day, month, year] = slotDate.split("_").map(Number);
    return new Date(year, month - 1, day); // month is 0-indexed in JavaScript Date
  };

  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/user/appointments", {
        headers: { token },
      });
      setAppointments(data.appointments.reverse());
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/user/cancel-appointment",
        { appointmentId },
        { headers: { token } }
      );
      if (data.success) {
        toast.success(data.message);
        getUserAppointments();
      } else toast.error(data.message);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // 💳 Razorpay
  const initPay = (order, appointmentData) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "Appointment Payment",
      description: "Appointment Payment",
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        try {
          setSuccessfulPayments((prev) =>
            new Set(prev).add(appointmentData._id)
          );
          toast.success("Payment successful! Confirming your appointment...");

          const { data } = await axios.post(
            backendUrl + "/api/user/verifyRazorpay",
            response,
            { headers: { token } }
          );

          if (data.success) {
            let message = "";

            if (appointmentData?.consultationMode === "online") {
              const zoomRes = await axios.post(
                backendUrl + "/api/zoom/create",
                { appointmentId: appointmentData._id },
                { headers: { token } }
              );

              const zoomLink = zoomRes.data.zoomJoinUrl;
              const doc = appointmentData.docData;
              const appointmentDate = slotDateFormat(appointmentData.slotDate);
              const appointmentTime = appointmentData.slotTime;

              message = `✅ *Appointment Confirmed - SympCare*
Hello ${userData.name},

Your payment of ₹${order.amount / 100} was successful.

📅 *Appointment With:* ${doc.name}
🎓 *Specialization:* ${doc.speciality}
📍 *Mode:* Online (Zoom)
🗓️ *Date:* ${appointmentDate}
🕒 *Time:* ${appointmentTime}

📌 *Zoom Link:* ${zoomLink}

Please join on time. Thank you for choosing *SympCare*! 💚`;
            } else {
              message = `✅ *Payment Successful - SympCare*

Hello ${userData.name},

We have received your payment of ₹${
                order.amount / 100
              } for your offline appointment.

🧾 *Payment ID:* ${response.razorpay_payment_id}
📄 *Order ID:* ${response.razorpay_order_id}

Your appointment is now confirmed.

Thank you for choosing *SympCare* 💚`;
            }

            await axios.post(backendUrl + "/api/whatsapp/send-message", {
              type: "payment",
              number: userData.phone,
              message,
            });

            await getUserAppointments();
            toast.success("Appointment confirmed successfully! 🎉");
          }
        } catch (error) {
          console.log(error);
          setSuccessfulPayments((prev) => {
            const newSet = new Set(prev);
            newSet.delete(appointmentData._id);
            return newSet;
          });
          toast.error("Payment verification failed: " + error.message);
        }
      },
      modal: {
        ondismiss: function () {
          toast.info("Payment cancelled");
        },
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const appointmentRazorpay = async (appointmentId, appointmentData) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/user/payment-razorpay",
        { appointmentId },
        { headers: { token } }
      );
      if (data.success) initPay(data.order, appointmentData);
      else toast.error(data.message);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const appointmentStripe = async (appointmentId, appointmentData) => {
    try {
      setSuccessfulPayments((prev) => new Set(prev).add(appointmentData._id));
      const { data } = await axios.post(
        backendUrl + "/api/user/payment-stripe",
        { appointmentId },
        { headers: { token } }
      );
      if (data.success) {
        toast.success("Redirecting to payment...");
        window.location.replace(data.session_url);
      } else {
        setSuccessfulPayments((prev) => {
          const newSet = new Set(prev);
          newSet.delete(appointmentData._id);
          return newSet;
        });
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      setSuccessfulPayments((prev) => {
        const newSet = new Set(prev);
        newSet.delete(appointmentData._id);
        return newSet;
      });
      toast.error(error.message);
    }
  };

  // 💬 Chat Feature
  const openChat = async (appointment) => {
    setSelectedAppointment(appointment);
    setChatOpen(true);
    try {
      const { data } = await axios.get(
        `${backendUrl}/api/chat/${appointment._id}`,
        { headers: { token } }
      );
      setChatMessages(data.messages || []);
    } catch (err) {
      console.log(err);
      toast.error("Failed to load chat");
    }
  };

  // Helper function to check if appointment is ongoing (within 30 minutes after slot time starts)
  const isAppointmentOngoing = (slotDate, slotTime) => {
    const [day, month, year] = slotDate.split("_").map(Number);
    const [time, modifier] = slotTime.split(" ");
    let [hours, minutes] = time.split(":").map(Number);

    // Convert to 24-hour format
    if (modifier === "PM" && hours !== 12) hours += 12;
    if (modifier === "AM" && hours === 12) hours = 0;

    const appointmentDateTime = new Date(year, month - 1, day, hours, minutes);
    const now = new Date();

    // Check if current time is within 30 minutes AFTER appointment start time
    const thirtyMinutes = 30 * 60 * 1000; // 30 minutes in milliseconds
    const timeDifference = now - appointmentDateTime;

    return timeDifference >= 0 && timeDifference <= thirtyMinutes;
  };
  // Helper function to check if appointment is upcoming today
  const isAppointmentUpcomingToday = (slotDate, slotTime) => {
    const [day, month, year] = slotDate.split("_").map(Number);
    const [time, modifier] = slotTime.split(" ");
    let [hours, minutes] = time.split(":").map(Number);

    // Convert to 24-hour format
    if (modifier === "PM" && hours !== 12) hours += 12;
    if (modifier === "AM" && hours === 12) hours = 0;

    const appointmentDateTime = new Date(year, month - 1, day, hours, minutes);
    const now = new Date();

    // Check if it's today and appointment time is in the future
    return (
      appointmentDateTime.toDateString() === now.toDateString() &&
      appointmentDateTime > now
    );
  };

  useEffect(() => {
    if (token) getUserAppointments();
  }, [token]);

  return (
    <div className="p-5 max-w-6xl mx-auto">
      <motion.div
        className="text-center mb-8"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="inline-flex items-center mb-4 space-x-3">
          <div className="w-12 h-1 bg-primary rounded-full"></div>
          <h3 className="text-lg font-semibold text-primary">
            My Appointments
          </h3>
          <div className="w-12 h-1 bg-primary rounded-full"></div>
        </div>
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          Appointment <span className="text-primary">Overview</span>
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto text-lg">
          Manage your upcoming consultations and view past appointment details
        </p>
      </motion.div>

      {/* Payment Alert Banner */}
      {appointments.some(
        (item) =>
          item.consultationMode === "online" &&
          !item.payment &&
          !item.cancelled &&
          !item.isCompleted &&
          !successfulPayments.has(item._id) &&
          parseSlotDate(item.slotDate) >= new Date() // Only show alert for future appointments
      ) && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-xl flex items-center gap-3"
        >
          <div className="flex-shrink-0 w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center">
            <span className="text-white text-sm">!</span>
          </div>
          <div>
            <p className="text-amber-800 font-medium">
              Payment Required for Online Consultations
            </p>
            <p className="text-amber-700 text-sm">
              Complete payment to receive your Zoom meeting link for online
              appointments
            </p>
          </div>
        </motion.div>
      )}

      <div className="mt-6 space-y-6">
        {appointments.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="p-6 border border-gray-200 rounded-2xl shadow-sm bg-white hover:shadow-md transition-all duration-300 relative"
          >
            {/* Status Badge */}
            <div className="absolute -top-2 -right-2">
              {item.cancelled ? (
                <span className="bg-red-100 text-red-800 text-xs font-medium px-3 py-1 rounded-full border border-red-200">
                  Cancelled
                </span>
              ) : item.isCompleted ? (
                <span className="bg-green-100 text-green-800 text-xs font-medium px-3 py-1 rounded-full border border-green-200">
                  Completed
                </span>
              ) : isAppointmentOngoing(item.slotDate, item.slotTime) ? (
                item.consultationMode === "online" && item.payment ? (
                  <span className="bg-purple-100 text-purple-800 text-xs font-medium px-3 py-1 rounded-full border border-purple-200 animate-pulse">
                    Join Now
                  </span>
                ) : (
                  <span className="bg-orange-100 text-orange-800 text-xs font-medium px-3 py-1 rounded-full border border-orange-200">
                    Ongoing
                  </span>
                )
              ) : isAppointmentUpcomingToday(item.slotDate, item.slotTime) ? (
                <span className="bg-blue-100 text-blue-800 text-xs font-medium px-3 py-1 rounded-full border border-blue-200">
                  Today
                </span>
              ) : parseSlotDate(item.slotDate) < new Date() ? (
                <span className="bg-gray-100 text-gray-800 text-xs font-medium px-3 py-1 rounded-full border border-gray-200">
                  Expired
                </span>
              ) : (
                <span className="bg-blue-100 text-blue-800 text-xs font-medium px-3 py-1 rounded-full border border-blue-200">
                  Upcoming
                </span>
              )}
            </div>

            <div className="flex flex-col md:flex-row gap-6">
              {/* Doctor Info */}
              <div className="flex items-start gap-4 w-full md:w-2/5">
                <img
                  className="w-32 h-40 object-cover rounded-xl border-2 border-gray-100 bg-gray-50"
                  src={item.docData.image}
                  alt={item.docData.name}
                  onError={(e) => {
                    e.target.src = "/doctor-placeholder.png";
                  }}
                />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    {item.docData.name}
                  </h3>
                  <p className="text-sm text-primary font-medium mb-2">
                    {item.docData.speciality}
                  </p>
                  <div className="text-xs text-gray-600 space-y-0.5">
                    <p>{item.docData.address.line1}</p>
                  </div>
                </div>
              </div>

              {/* Appointment Details */}
              <div className="flex-1 space-y-3">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <span className="text-sm font-medium text-gray-700">
                    {slotDateFormat(item.slotDate)} | {item.slotTime}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Video className="w-4 h-4 text-gray-500" />
                  <span className="text-sm font-medium text-gray-700">
                    Consultation:{" "}
                    {item.consultationMode === "online" ? "Online" : "Offline"}
                  </span>
                </div>

                {/* Payment Required Alert for Online Consultations */}
                {item.consultationMode === "online" &&
                  !item.payment &&
                  !item.cancelled &&
                  !item.isCompleted &&
                  !successfulPayments.has(item._id) && (
                    <div className="flex items-center gap-2 p-3 bg-amber-50 rounded-lg border border-amber-200">
                      <AlertCircle className="w-4 h-4 text-amber-600" />
                      <span className="text-sm text-amber-700 font-medium">
                        Payment required to get Zoom meeting link
                      </span>
                    </div>
                  )}

                {/* Zoom Meeting Ready - Enhanced for ongoing appointments */}
                {item.consultationMode === "online" &&
                  item.payment &&
                  item.zoomJoinUrl && (
                    <div
                      className={`flex items-center gap-3 p-3 rounded-lg border ${
                        isAppointmentOngoing(item.slotDate, item.slotTime)
                          ? "bg-purple-50 border-purple-300 shadow-sm"
                          : "bg-green-50 border-green-200"
                      }`}
                    >
                      {isAppointmentOngoing(item.slotDate, item.slotTime) ? (
                        <div className="flex-shrink-0 w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center animate-pulse">
                          <Video className="w-3 h-3 text-white" />
                        </div>
                      ) : (
                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                      )}
                      <div className="flex-1">
                        <span
                          className={`text-sm font-medium ${
                            isAppointmentOngoing(item.slotDate, item.slotTime)
                              ? "text-purple-800"
                              : "text-green-800"
                          }`}
                        >
                          {isAppointmentOngoing(item.slotDate, item.slotTime)
                            ? "Meeting is live now"
                            : "Your Zoom meeting is ready"}
                        </span>
                        <a
                          href={item.zoomJoinUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`block mt-1 text-sm font-semibold hover:opacity-80 ${
                            isAppointmentOngoing(item.slotDate, item.slotTime)
                              ? "text-purple-700 underline"
                              : "text-green-700 underline"
                          }`}
                        >
                          {isAppointmentOngoing(item.slotDate, item.slotTime)
                            ? "Join Meeting Now →"
                            : "Join Now →"}
                        </a>
                      </div>
                    </div>
                  )}
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-3 min-w-[180px]">
                {/* Chat Button */}
                {(item.payment || successfulPayments.has(item._id)) &&
                  !item.cancelled &&
                  !item.isCompleted && (
                    <button
                      onClick={() => openChat(item)}
                      className="flex items-center justify-center gap-2 border border-primary text-primary rounded-lg py-2.5 px-4 hover:bg-primary hover:text-white transition-all duration-200 font-medium"
                    >
                      <IoMdChatbubbles className="w-4 h-4" />
                      Chat with Doctor
                    </button>
                  )}

                {/* Payment Status */}
                {successfulPayments.has(item._id) &&
                  !item.cancelled &&
                  !item.isCompleted && (
                    <div className="py-2.5 px-4 border border-green-300 rounded-lg bg-green-50 text-green-700 text-center font-medium flex items-center justify-center gap-2">
                      <CheckCircle className="w-4 h-4" />
                      Payment Successful
                    </div>
                  )}

                {/* Pay Online Button */}
                {!item.cancelled &&
                  !item.payment &&
                  !item.isCompleted &&
                  payment !== item._id &&
                  !successfulPayments.has(item._id) && (
                    <button
                      onClick={() => setPayment(item._id)}
                      className="border border-amber-500 text-amber-700 rounded-lg py-2.5 px-4 hover:bg-amber-500 hover:text-white transition-all duration-200 font-medium"
                    >
                      Pay Online
                    </button>
                  )}

                {/* Payment Gateway Options */}
                {!item.cancelled &&
                  !item.payment &&
                  !item.isCompleted &&
                  payment === item._id &&
                  !successfulPayments.has(item._id) && (
                    <div className="space-y-2">
                      <p className="text-xs text-gray-600 text-center mb-2">
                        Choose payment method:
                      </p>
                      <button
                        onClick={() => appointmentRazorpay(item._id, item)}
                        className="w-full border border-gray-300 rounded-lg py-2.5 px-4 hover:bg-gray-50 transition-all duration-200 flex items-center justify-center gap-2"
                      >
                        <img
                          className="h-5"
                          src={assets.razorpay_logo}
                          alt="Razorpay"
                        />
                      </button>
                      <button
                        onClick={() => appointmentStripe(item._id, item)}
                        className="w-full border border-gray-300 rounded-lg py-2.5 px-4 hover:bg-gray-50 transition-all duration-200 flex items-center justify-center gap-2"
                      >
                        <img
                          className="h-5"
                          src={assets.stripe_logo}
                          alt="Stripe"
                        />
                      </button>
                    </div>
                  )}

                {/* Paid Status */}
                {!item.cancelled && item.payment && !item.isCompleted && (
                  <div className="py-2.5 px-4 border border-gray-300 rounded-lg bg-gray-50 text-gray-700 text-center font-medium">
                    Paid
                  </div>
                )}

                {/* Completed Status */}
                {item.isCompleted && (
                  <div className="py-2.5 px-4 border border-green-500 rounded-lg bg-green-50 text-green-700 text-center font-medium flex items-center justify-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    Completed
                  </div>
                )}

                {/* Cancel Appointment */}
                {!item.cancelled &&
                  !item.isCompleted &&
                  !successfulPayments.has(item._id) && (
                    <button
                      onClick={() => cancelAppointment(item._id)}
                      className="border border-red-500 text-red-600 rounded-lg py-2.5 px-4 hover:bg-red-500 hover:text-white transition-all duration-200 font-medium"
                    >
                      Cancel Appointment
                    </button>
                  )}

                {/* Cancelled Status */}
                {item.cancelled && (
                  <div className="py-2.5 px-4 border border-red-300 rounded-lg bg-red-50 text-red-700 text-center font-medium">
                    Appointment Cancelled
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {chatOpen && (
        <ChatWithDoctor
          appointment={selectedAppointment}
          isOpen={true}
          setChatOpen={setChatOpen}
        />
      )}
    </div>
  );
};

export default MyAppointments;
