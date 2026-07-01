import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "./Models/User.js";

const EMAIL = "ananya@travel.com";   // <-- change to your email
const NEW_PASSWORD = "password123";  // <-- change to your new password

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("Connected to DB");

    // List all users first
    const users = await User.find({}, { name: 1, email: 1 });
    console.log("\nAll users in DB:");
    users.forEach((u, i) => console.log(`  ${i + 1}. ${u.name} — ${u.email}`));

    // Reset password for the specified email
    const user = await User.findOne({ email: EMAIL });
    if (!user) {
      console.log(`\nNo user found with email: ${EMAIL}`);
    } else {
      const hashed = await bcrypt.hash(NEW_PASSWORD, 10);
      user.password = hashed;
      user.isModified = () => true; // bypass pre-save hook double-hash
      await User.updateOne({ email: EMAIL }, { password: hashed });
      console.log(`\nPassword reset successful for: ${user.name} (${user.email})`);
      console.log(`New password: ${NEW_PASSWORD}`);
    }

    mongoose.connection.close();
  })
  .catch((err) => console.error("Error:", err.message));
