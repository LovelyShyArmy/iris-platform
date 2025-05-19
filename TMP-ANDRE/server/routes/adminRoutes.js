import express from "express";
import User from "../models/User.js";
import Offer from "../models/Offer.js";
import Audit from "../models/Audit.js";
import jwt from "jsonwebtoken";

const router = express.Router();

const protect = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).send("No token");
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const user = await User.findById(decoded.id);
  if (!user?.isAdmin) return res.status(403).send("Not admin");
  req.admin = user;
  next();
};

// 👥 Get All Users
router.get("/users", protect, async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
});

// 📢 Get All Offers
router.get("/offers", protect, async (req, res) => {
  const offers = await Offer.find().populate("createdBy", "name email");
  res.json(offers);
});

// 🚨 Toggle User Active State
router.put("/users/:id/toggle", protect, async (req, res) => {
  const user = await User.findById(req.params.id);
  user.active = !user.active;
  await user.save();
  res.json({ msg: user.active ? "Unbanned" : "Banned", user });
});

// 📊 Stats Summary
router.get("/stats", protect, async (req, res) => {
  const users = await User.countDocuments();
  const offers = await Offer.countDocuments();
  const avgRating = (await User.aggregate([
    { $match: { rating: { $exists: true } } },
    { $group: { _id: null, avg: { $avg: "$rating" } } }
  ]))[0]?.avg || 0;

  res.json({ users, offers, avgRating: avgRating.toFixed(2) });
});

export default router;
