import mongoose from "mongoose";

const travelSchema = new mongoose.Schema({
  title: String,
  description: String,
  images: [String],          // existing field — kept as-is
  image: { type: String, default: "" }, // new optional single image URL
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Travel", travelSchema);
