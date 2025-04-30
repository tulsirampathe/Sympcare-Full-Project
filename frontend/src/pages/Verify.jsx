import axios from "axios";
import React, { useContext, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";

const Verify = () => {
  const [searchParams] = useSearchParams();

  const success = searchParams.get("success");
  const appointmentId = searchParams.get("appointmentId");

  const { backendUrl, token } = useContext(AppContext);

  const navigate = useNavigate();

  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split("_");
    return `${dateArray[0]} ${months[Number(dateArray[1])]} ${dateArray[2]}`;
  };

  const verifyStripe = async () => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/user/verifyStripe",
        { success, appointmentId },
        { headers: { token } }
      );

      if (data.success) {
        toast.success(data.message);
        const { appointmentData, userData } = data;
        let patientMessage = "";
        let doctorMessage = "";
        const doc = appointmentData.docData;

        const appointmentDate = slotDateFormat(appointmentData.slotDate);
        const appointmentTime = appointmentData.slotTime;

        if (appointmentData?.consultationMode === "online") {
          const zoomRes = await axios.post(
            backendUrl + "/api/zoom/create",
            { appointmentId: appointmentData._id },
            { headers: { token } }
          );

          const zoomLink = zoomRes.data.zoomJoinUrl;

          // Message to patient
          patientMessage = `✅ *Appointment Confirmed - SympCare*

Hello ${userData.name},

Your payment of ₹${appointmentData.amount} was successful.

📅 *Appointment With:* Dr. ${doc.name}
🎓 *Specialization:* ${doc.speciality}
📍 *Mode:* Online (Zoom)
🗓️ *Date:* ${appointmentDate}
🕒 *Time:* ${appointmentTime}

📌 *Zoom Link:* ${zoomLink}

Please join on time. Thank you for choosing *SympCare*! 💚`;

          // Message to doctor
          doctorMessage = `🩺 *New Online Consultation - SympCare*

Hello Dr. ${doc.name},

A new online consultation has been confirmed.

👤 *Patient Name:* ${userData.name}
📍 *Mode:* Online (Zoom)
🗓️ *Date:* ${appointmentDate}
🕒 *Time:* ${appointmentTime}

📌 *Zoom Link:* ${zoomLink}

Please be available on time. Thank you for your care and dedication! 💚`;

        } else {
          // Offline Appointment

          patientMessage = `✅ *Payment Successful - SympCare*

Hello ${userData.name},

We have received your payment of ₹${appointmentData.amount} for your offline appointment.

📅 *Appointment With:* Dr. ${doc.name}
🎓 *Specialization:* ${doc.speciality}
📍 *Mode:* Offline
🗓️ *Date:* ${appointmentDate}
🕒 *Time:* ${appointmentTime}

Your appointment is now confirmed.

Thank you for choosing *SympCare* 💚`;

          doctorMessage = `🩺 *New Offline Consultation - SympCare*

Hello Dr. ${doc.name},

An offline consultation has been confirmed.

👤 *Patient Name:* ${userData.name}
🗓️ *Date:* ${appointmentDate}
🕒 *Time:* ${appointmentTime}

Please be available on time. Thank you for your care and dedication! 💚`;
        }

        // Send message to patient
        await axios.post("http://localhost:4000/api/whatsapp/send-message", {
          type: "payment",
          number: userData.phone,
          message: patientMessage,
        });

        // Send message to doctor
        await axios.post("http://localhost:4000/api/whatsapp/send-message", {
          type: "zoom",
          number: doc.phone,
          message: doctorMessage,
        });

        console.log("Messages sent:");
        console.log("Patient:", patientMessage);
        console.log("Doctor:", doctorMessage);
      } else {
        toast.error(data.message);
      }

      navigate("/my-appointments");
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  useEffect(() => {
    if (token && appointmentId && success) {
      verifyStripe();
    }
  }, [token]);

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="w-20 h-20 border-4 border-gray-300 border-t-4 border-t-primary rounded-full animate-spin"></div>
    </div>
  );
};

export default Verify;
