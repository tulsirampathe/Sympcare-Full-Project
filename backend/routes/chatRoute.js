import express from "express";
import {
    deleteMessage,
    getMessages,
    markAsSeen,
    sendMessage,
} from "../controllers/chatController.js";
import { v2 as cloudinary } from "cloudinary";
import upload from '../middleware/multer.js';

const chatRouter = express.Router();

// ✅ Send a message
chatRouter.post("/send", sendMessage);

// ✅ Get all messages
chatRouter.get("/:appointmentId", getMessages);

// ✅ Mark as seen
chatRouter.post("/mark-seen/:appointmentId", markAsSeen);

// ✅ Delete message
chatRouter.delete("/:messageId", deleteMessage);

// ✅ Upload file to Cloudinary
chatRouter.post("/upload", upload.single("file"), async (req, res) => {
  try {
    if (!req.file)
      return res.status(400).json({ success: false, message: "No file uploaded" });

    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "chat_files",
      resource_type: "auto",
    });

    res.json({
      success: true,
      fileUrl: result.secure_url,
    });
  } catch (error) {
    console.error("Cloudinary upload failed:", error);
    res.status(500).json({
      success: false,
      message: "File upload failed",
      error: error.message,
    });
  }
});

export default chatRouter;
