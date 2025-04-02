const express = require("express");
const Message = require("../models/Message");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

// Get all messages
router.get("/", async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Send a message
router.post("/", protect, async (req, res) => {
  const { text } = req.body;
  const sender = req.user.username;

  try {
    const message = await Message.create({ sender, text });
    res.status(201).json(message);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
