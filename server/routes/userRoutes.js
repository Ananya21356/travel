import express from "express";
const router = express.Router();

// Example static response
router.get("/", (req, res) => {
  res.json({ message: "Users route is working!" });
});

export default router;
