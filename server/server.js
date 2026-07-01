// server.js
import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import app from "./app.js";

const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT || 8000;

if (!MONGO_URI) {
  console.error("Missing MONGO_URI in environment. Add it to your .env file.");
  process.exit(1);
}

async function startServer() {
  try {
    // connect to MongoDB
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected");

    // start express app
    const server = app.listen(PORT, () => {
      console.log(`Server running on ${PORT}`);
    });

    // graceful shutdown handlers
    const shutdown = async (signal) => {
      console.log(`\nReceived ${signal}. Closing server and MongoDB connection...`);
      server.close(() => {
        mongoose.connection.close(false, () => {
          console.log("MongoDB connection closed");
          process.exit(0);
        });
      });
    };

    process.on("SIGINT", () => shutdown("SIGINT"));
    process.on("SIGTERM", () => shutdown("SIGTERM"));

    // log unhandled errors
    process.on("unhandledRejection", (reason) => {
      console.error("Unhandled Rejection:", reason);
    });
    process.on("uncaughtException", (err) => {
      console.error("Uncaught Exception:", err);
      process.exit(1);
    });
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
}

startServer();

