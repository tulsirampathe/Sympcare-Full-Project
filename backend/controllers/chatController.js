import chatMessageModel from "../models/chatMessageModel.js";

// 🟢 Send a message
export const sendMessage = async (req, res) => {
  try {
    const { appointmentId, senderId, receiverId, message, attachmentUrl } = req.body;

    const newMessage = await chatMessageModel.create({
      appointmentId,
      senderId,
      receiverId,
      message,
      attachmentUrl,
    });

    res.json({ success: true, message: "Message sent", data: newMessage });
  } catch (error) {
    console.error("Send Message Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// 🟢 Get messages of an appointment
export const getMessages = async (req, res) => {
  try {
    const { appointmentId } = req.params;

    const messages = await chatMessageModel
      .find({ appointmentId })
      .sort({ createdAt: 1 }); // Oldest to newest

    res.json({ success: true, messages });
  } catch (error) {
    console.error("Get Messages Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// 🟢 Mark all messages as seen
export const markAsSeen = async (req, res) => {
  try {
    const { appointmentId } = req.params;
    const { userId } = req.body;

    await chatMessageModel.updateMany(
      { appointmentId, receiverId: userId, seen: false },
      { $set: { seen: true } }
    );

    res.json({ success: true, message: "Messages marked as seen" });
  } catch (error) {
    console.error("Mark Seen Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// 🟢 Delete a message (optional)
export const deleteMessage = async (req, res) => {
  try {
    const { messageId } = req.params;
    await chatMessageModel.findByIdAndDelete(messageId);
    res.json({ success: true, message: "Message deleted" });
  } catch (error) {
    console.error("Delete Message Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
