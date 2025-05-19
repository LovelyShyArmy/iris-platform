import express from "express";
import Offer from "../models/Offer.js";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

// Auth middleware
const protect = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).send("No token");
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await User.findById(decoded.id);
  next();
};

// Create Offer
router.post("/", protect, async (req, res) => {
  const { type, title, description, industry, deadline } = req.body;
  const newOffer = await Offer.create({
    type, title, description, industry, deadline,
    createdBy: req.user._id
  });
  res.json(newOffer);
});

// Get All Offers
router.get("/", async (req, res) => {
  const { type, industry } = req.query;
  const filter = {};
  if (type) filter.type = type;
  if (industry) filter.industry = industry;
  const offers = await Offer.find(filter).populate("createdBy", "name email role");
  res.json(offers);
});

export default router;
