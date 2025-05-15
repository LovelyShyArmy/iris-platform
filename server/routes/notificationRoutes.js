import express from "express";
import Notification from "../models/Notification.js";
import jwt from "jsonwebtoken";

const router = express.Router();

const protect = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).send("No token");
  req.user = jwt.verify(token, process.env.JWT_SECRET);
  next();
};

// Get My Notifications
router.get("/", protect, async (req, res) => {
  const notes = await Notification.find({ user: req.user.id }).sort({ createdAt: -1 });
  res.json(notes);
});

// Mark Read
router.put("/:id", protect, async (req, res) => {
  await Notification.findByIdAndUpdate(req.params.id, { read: true });
  res.send("ok");
});

export default router;
