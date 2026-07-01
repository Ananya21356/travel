import express from "express";
import { getTravels, getTravelById, addTravel, deleteTravel } from "../controllers/travelController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", getTravels);
router.get("/:id", getTravelById);
router.post("/", authMiddleware, addTravel);
router.delete("/:id", authMiddleware, deleteTravel);

export default router;
