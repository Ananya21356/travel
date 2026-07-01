import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import travelRoutes from "./routes/travelRoutes.js";

const app = express();

app.use(cors({ origin: ["http://localhost:3000", "http://localhost:3001", "http://localhost:4000"] }));
app.use(express.json());

// Add /api prefix to routes
app.use("/api/auth", authRoutes);
app.use("/api/travels", travelRoutes);

export default app;