import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRoute.js";
import doctorRouter from "./routes/doctorRoute.js";
import adminRouter from "./routes/adminRoute.js";
import whatsappRoutes from "./routes/whatsappRoutes.js";
import zoomRoutes from "./routes/zoomRoutes.js"

import { initializeWhatsApp } from "./whatsappClient.js";



// app config
const app = express();
const port = process.env.PORT || 4000;

// Database and Cloudinary connection
connectDB();
connectCloudinary();

initializeWhatsApp();// Initialize WhatsApp Client

// middlewares
app.use(express.json());
app.use(cors());

// api endpoints
app.use("/api/user", userRouter);
app.use("/api/admin", adminRouter);
app.use("/api/doctor", doctorRouter);

// Add the WhatsApp reminder route
app.use("/api/whatsapp", whatsappRoutes);

app.use("/api/zoom", zoomRoutes);

// Default route
app.get("/", (req, res) => {
  res.send("API Working");
});

// Start the server
app.listen(port, () => console.log(`Server started on PORT:${port}`));
