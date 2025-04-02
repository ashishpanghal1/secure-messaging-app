const crypto = require("crypto");
const fs = require("fs");
const Message = require("../models/Message");

exports.sendMessage = async (req, res) => {
  try {
    const { receiver, message } = req.body;
    const publicKey = fs.readFileSync(__dirname + "/../config/public.pem", "utf8");
    
    const encryptedMessage = crypto.publicEncrypt(
      publicKey,
      Buffer.from(message, "utf-8")
    ).toString("base64");

    const newMessage = new Message({ sender: req.user.id, receiver, encryptedMessage });
    await newMessage.save();
    res.status(200).json({ message: "Message Sent Successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error Sending Message" });
  }
};

exports.getMessages = async (req, res) => {
  try {
    const messages = await Message.find({ receiver: req.user.id }).populate("sender", "username");
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: "Error Fetching Messages" });
  }
};
