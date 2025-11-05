import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import { IoMdChatbubbles } from "react-icons/io";
import ChatWithDoctor from "../components/ChatWithDoctor";

const MyAppointments = () => {
  const { backendUrl, token, userData } = useContext(AppContext);
  const navigate = useNavigate();

  const [appointments, setAppointments] = useState([]);
  const [payment, setPayment] = useState("");
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [successfulPayments, setSuccessfulPayments] = useState(new Set()); // Track successful payments

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
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // 📍 Razorpay Payment Flow
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
          // Show immediate success feedback
          setSuccessfulPayments(prev => new Set(prev).add(appointmentData._id));
          toast.success("Payment successful! Confirming your appointment...");

          const { data } = await axios.post(
            backendUrl + "/api/user/verifyRazorpay",
            response,
            { headers: { token } }
          );

          if (data.success) {
            let message = "";

            // If online, create Zoom meeting
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

📅 *Appointment With:* Dr. ${doc.name}
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

            // Refresh appointments and show final success message
            await getUserAppointments();
            toast.success("Appointment confirmed successfully! 🎉");
            
          }
        } catch (error) {
          console.log(error);
          // Remove from successful payments if verification failed
          setSuccessfulPayments(prev => {
            const newSet = new Set(prev);
            newSet.delete(appointmentData._id);
            return newSet;
          });
          toast.error("Payment verification failed: " + error.message);
        }
      },
      // Handle payment failure
      modal: {
        ondismiss: function() {
          toast.info("Payment cancelled");
        }
      }
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

      if (data.success) {
        initPay(data.order, appointmentData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // 📍 Stripe Payment Flow
  const appointmentStripe = async (appointmentId, appointmentData) => {
    try {
      // Show immediate success feedback for Stripe too
      setSuccessfulPayments(prev => new Set(prev).add(appointmentData._id));
      
      const { data } = await axios.post(
        backendUrl + "/api/user/payment-stripe",
        { appointmentId },
        { headers: { token } }
      );
      if (data.success) {
        toast.success("Redirecting to payment...");
        const { session_url } = data;
        window.location.replace(session_url);
        
        // Note: For Stripe, we'll rely on webhooks or page refresh to update the UI
        // since it redirects to Stripe and back
      } else {
        // Remove from successful payments if failed
        setSuccessfulPayments(prev => {
          const newSet = new Set(prev);
          newSet.delete(appointmentData._id);
          return newSet;
        });
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      // Remove from successful payments if error
      setSuccessfulPayments(prev => {
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

  const sendMessage = async () => {
    if (!newMessage.trim()) return;
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/chat/send`,
        {
          appointmentId: selectedAppointment._id,
          senderId: userData._id,
          receiverId: selectedAppointment.docData._id,
          message: newMessage,
        },
        { headers: { token } }
      );

      setChatMessages((prev) => [...prev, data.message]);
      setNewMessage("");
    } catch (error) {
      console.log(error);
      toast.error("Failed to send message");
    }
  };

  useEffect(() => {
    if (token) getUserAppointments();
  }, [token]);

  return (
    <div className="relative">
      <p className="pb-3 mt-12 text-lg font-medium text-gray-600 border-b">
        My Appointments
      </p>

      {/* Appointment List */}
      <div>
        {appointments.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-4 border-b"
          >
            <div>
              <img
                className="w-36 bg-[#EAEFFF]"
                src={item.docData.image}
                alt=""
              />
            </div>

            <div className="flex-1 text-sm text-[#5E5E5E]">
              <p className="text-[#262626] text-base font-semibold">
                {item.docData.name}
              </p>
              <p>{item.docData.speciality}</p>
              <p className="text-[#464646] font-medium mt-1">Address:</p>
              <p>{item.docData.address.line1}</p>
              <p>{item.docData.address.line2}</p>
              <p className="mt-1">
                <span className="text-sm text-[#3C3C3C] font-medium">
                  Date & Time:
                </span>{" "}
                {slotDateFormat(item.slotDate)} | {item.slotTime}
              </p>
              <p className="mt-1">
                <span className="text-sm font-medium text-[#3C3C3C]">
                  Consultation Mode:
                </span>{" "}
                {item.consultationMode === "online" ? "Online" : "Offline"}
              </p>

              {/* Show Zoom link if online & paid */}
              {item.consultationMode === "online" &&
                item.payment &&
                item.zoomJoinUrl && (
                  <div className="mt-2 text-green-600">
                    ✅ Your Zoom meeting is ready:{" "}
                    <a
                      href={item.zoomJoinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline text-blue-600"
                    >
                      Join Now
                    </a>
                  </div>
                )}
            </div>

            <div className="flex flex-col gap-2 justify-end text-sm text-center">
              {/* Chat button */}
              {(item.payment || successfulPayments.has(item._id)) && !item.cancelled && !item.isCompleted && (
                <button
                  onClick={() => openChat(item)}
                  className="flex items-center justify-center gap-2 border rounded py-2 hover:bg-primary hover:text-white transition-all duration-300"
                >
                  <IoMdChatbubbles /> Chat with Doctor
                </button>
              )}

              {/* Payment Success Message (immediate feedback) */}
              {successfulPayments.has(item._id) && !item.cancelled && !item.isCompleted && (
                <div className="sm:min-w-48 py-2 border rounded bg-green-50 border-green-200 text-green-700">
                  ✅ Payment Successful
                </div>
              )}

              {/* Payment Buttons - Only show if not paid and not in successful payments */}
              {!item.cancelled &&
                !item.payment &&
                !item.isCompleted &&
                payment !== item._id &&
                !successfulPayments.has(item._id) && (
                  <button
                    onClick={() => setPayment(item._id)}
                    className="text-[#696969] sm:min-w-48 py-2 border rounded hover:bg-primary hover:text-white transition-all duration-300"
                  >
                    Pay Online
                  </button>
                )}

              {!item.cancelled &&
                !item.payment &&
                !item.isCompleted &&
                payment === item._id &&
                !successfulPayments.has(item._id) && (
                  <>
                    <button
                      onClick={() => appointmentRazorpay(item._id, item)}
                      className="text-[#696969] sm:min-w-48 py-2 border rounded hover:bg-gray-100 transition-all duration-300 flex items-center justify-center"
                    >
                      <img
                        className="max-w-20 max-h-5"
                        src={assets.razorpay_logo}
                        alt="Razorpay"
                      />
                    </button>

                    <button
                      onClick={() => appointmentStripe(item._id, item)}
                      className="text-[#696969] sm:min-w-48 py-2 border rounded hover:bg-gray-100 transition-all duration-300 flex items-center justify-center"
                    >
                      <img
                        className="max-w-20 max-h-5"
                        src={assets.stripe_logo}
                        alt="Stripe"
                      />
                    </button>
                  </>
                )}

              {/* Payment completed (from backend data) */}
              {!item.cancelled && item.payment && !item.isCompleted && (
                <button className="sm:min-w-48 py-2 border rounded text-[#696969] bg-[#EAEFFF]">
                  Paid
                </button>
              )}

              {/* Appointment completed */}
              {item.isCompleted && (
                <button className="sm:min-w-48 py-2 border border-green-500 rounded text-green-500">
                  Completed
                </button>
              )}

              {/* Cancel button */}
              {!item.cancelled && !item.isCompleted && !successfulPayments.has(item._id) && (
                <button
                  onClick={() => cancelAppointment(item._id)}
                  className="text-[#696969] sm:min-w-48 py-2 border rounded hover:bg-red-600 hover:text-white transition-all duration-300"
                >
                  Cancel appointment
                </button>
              )}
              {item.cancelled && !item.isCompleted && (
                <button className="sm:min-w-48 py-2 border border-red-500 rounded text-red-500">
                  Appointment cancelled
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* 💬 Chat Modal */}
      {chatOpen && (
        <ChatWithDoctor appointment={selectedAppointment} isOpen={true} setChatOpen={setChatOpen} />
      )}
    </div>
  );
};

export default MyAppointments;