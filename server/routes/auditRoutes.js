import express from "express";
import Audit from "../models/Audit.js";
import { calculateScore } from "../utils/score.js";
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

// Create or Update Audit
router.post("/", protect, async (req, res) => {
  const { certifications, notes } = req.body;
  const scores = calculateScore({ certifications });

  const audit = await Audit.findOneAndUpdate(
    { company: req.user._id },
    { ...scores, certifications, notes, company: req.user._id },
    { upsert: true, new: true }
  );
  res.json(audit);
});

// Get My Audit
router.get("/me", protect, async (req, res) => {
  const audit = await Audit.findOne({ company: req.user._id });
  res.json(audit);
});

export default router;
