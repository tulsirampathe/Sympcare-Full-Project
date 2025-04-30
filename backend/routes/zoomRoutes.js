import express from "express";
import { createZoomMeeting } from "../controllers/zoomController.js";

const router = express.Router();

router.post("/create", createZoomMeeting);

export default router;
