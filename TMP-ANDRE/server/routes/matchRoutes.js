import express from "express";
import Offer from "../models/Offer.js";
import User from "../models/User.js";
import Audit from "../models/Audit.js";
import { scoreMatch } from "../utils/match.js";
import jwt from "jsonwebtoken";

const router = express.Router();

const protect = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).send("No token");
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await User.findById(decoded.id);
  next();
};

// Match suppliers for one NEED offer
router.post("/", protect, async (req, res) => {
  const { offerId } = req.body;
  const offer = await Offer.findById(offerId);
  if (!offer || offer.type !== "need") return res.status(400).json({ msg: "Offer invalid" });

  const suppliers = await User.find({ role: "supplier" });
  const audits = await Audit.find({});

  const results = suppliers.map(supplier => {
    const audit = audits.find(a => a.company.toString() === supplier._id.toString());
    const score = scoreMatch(offer, supplier, audit);
    return { supplier, audit, score };
  });

  // Filter & sort
  const matched = results.filter(r => r.score >= 40)
    .sort((a, b) => b.score - a.score);

  res.json(matched);
});

export default router;
