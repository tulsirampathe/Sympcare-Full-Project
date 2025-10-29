import express from "express";
import cors from "cors";
import "dotenv/config";
import http from "http";
import { Server } from "socket.io";

import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRoute.js";
import doctorRouter from "./routes/doctorRoute.js";
import adminRouter from "./routes/adminRoute.js";
import whatsappRoutes from "./routes/whatsappRoutes.js";
import zoomRoutes from "./routes/zoomRoutes.js";
import chatRouter from "./routes/chatRoute.js";

import { initializeWhatsApp } from "./whatsappClient.js";
import chatMessageModel from "./models/chatMessageModel.js";

// ✅ App Config
const app = express();
const port = process.env.PORT || 4000;
const server = http.createServer(app);

// ✅ Setup Socket.io
const io = new Server(server, {
  cors: {
    origin: "*", // Replace with frontend URL in production
    methods: ["GET", "POST"],
  },
});

// ✅ Connect Database and Cloudinary
connectDB();
connectCloudinary();

// ✅ Initialize WhatsApp Client
initializeWhatsApp();

// ✅ Middleware
app.use(express.json());
app.use(cors());

// ✅ Routes
app.use("/api/user", userRouter);
app.use("/api/admin", adminRouter);
app.use("/api/doctor", doctorRouter);
app.use("/api/whatsapp", whatsappRoutes);
app.use("/api/zoom", zoomRoutes);
app.use("/api/chat", chatRouter);

app.get("/", (req, res) => {
  res.send("API Working");
});

// ✅ SOCKET.IO CHAT LOGIC
io.on("connection", (socket) => {
  console.log("🟢 New user connected:", socket.id);

  // Join appointment room
  socket.on("join_room", (appointmentId) => {
    if (!appointmentId) return;
    socket.join(appointmentId);
    console.log(`User joined room: ${appointmentId}`);
  });

  // Send Message
  socket.on("send_message", async (data) => {
    try {
      const { appointmentId, senderId, receiverId, message, attachmentUrl } = data;
      if (!appointmentId || !senderId || !receiverId) return;

      const newMessage = await chatMessageModel.create({
        appointmentId,
        senderId,
        receiverId,
        message,
        attachmentUrl
      });

      io.to(appointmentId).emit("receive_message", newMessage);
    } catch (error) {
      console.error("❌ Message Save Error:", error);
    }
  });

  socket.on("disconnect", () => {
    console.log("🔴 User disconnected:", socket.id);
  });
});

// ✅ Start Server
server.listen(port, () => {
  console.log(`🚀 Server started on PORT: ${port}`);
});
