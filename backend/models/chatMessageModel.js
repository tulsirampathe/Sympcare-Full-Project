// models/chatMessageModel.js
import mongoose from "mongoose";

const chatMessageSchema = new mongoose.Schema(
  {
    appointmentId: { type: mongoose.Schema.Types.ObjectId, ref: "appointment", required: true },
    senderId: { type: String, required: true },
    receiverId: { type: String, required: true },
    message: { type: String, default: "" },
    attachmentUrl: { type: String, default: "" },
    seen: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const chatMessageModel =
  mongoose.models.chatMessage || mongoose.model("chatMessage", chatMessageSchema);

export default chatMessageModel;
