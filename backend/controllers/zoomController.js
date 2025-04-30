import { generateZoomMeeting } from "../utils/zoomMeeting.js";
import appointmentModel from "../models/appointmentModel.js";

export const createZoomMeeting = async (req, res) => {
  try {
    const { appointmentId } = req.body;

    if (!appointmentId) {
      return res.status(400).json({ error: "Appointment ID is required." });
    }

    // Fetch full appointment data
    const appointment = await appointmentModel.findById(appointmentId);

    if (!appointment) {
      return res.status(404).json({ error: "Appointment not found." });
    }

    if (!appointment.userData || !appointment.docData) {
      return res.status(400).json({ error: "Appointment data is incomplete." });
    }

    // Create Zoom meeting
    const zoomJoinUrl = await generateZoomMeeting(appointment);

    if (!zoomJoinUrl) {
      return res.status(500).json({ error: "Zoom meeting creation failed." });
    }

    // Update appointment with Zoom URL
    appointment.zoomJoinUrl = zoomJoinUrl;
    await appointment.save();

    res.status(200).json({
      success: true,
      message: "Zoom meeting created and appointment updated.",
      zoomJoinUrl,
      updatedAppointment: appointment,
    });

  } catch (error) {
    console.error("Error creating Zoom meeting:", error);
    res.status(500).json({ error: "Failed to create Zoom meeting." });
  }
};
