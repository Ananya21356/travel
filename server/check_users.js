import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import User from "./Models/User.js";

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("Connected to DB:", process.env.MONGO_URI);

    const users = await User.find({}, { name: 1, email: 1, _id: 1 });

    if (users.length === 0) {
      console.log("No users found in the database.");
    } else {
      console.log(`Found ${users.length} user(s):`);
      users.forEach((u, i) => {
        console.log(`  ${i + 1}. Name: ${u.name} | Email: ${u.email} | ID: ${u._id}`);
      });
    }

    mongoose.connection.close();
    console.log("Connection closed.");
  })
  .catch((err) => {
    console.error("DB connection error:", err.message);
  });
