import express from "express";
import Message from "../models/Message.js";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

const protect = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).send("No token");
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await User.findById(decoded.id);
  next();
};

// Send message
router.post("/", protect, async (req, res) => {
  const { receiverId, content, offerRef } = req.body;
  const msg = await Message.create({
    sender: req.user._id,
    receiver: receiverId,
    content,
    offerRef
  });
  res.json(msg);
});

// Get conversation between 2 users
router.get("/:userId", protect, async (req, res) => {
  const messages = await Message.find({
    $or: [
      { sender: req.user._id, receiver: req.params.userId },
      { sender: req.params.userId, receiver: req.user._id }
    ]
  }).sort("timestamp");
  res.json(messages);
});

export default router;

const io = req.app.get("io");
const receiverSocket = [...io.sockets.sockets].find(([id, sock]) => onlineUsers.get(receiverId) === id);
if (receiverSocket) {
  io.to(receiverSocket[0]).emit("notification", {
    type: "message",
    from: req.user.name,
    text: "Nouveau message reçu 📩"
  });
}
