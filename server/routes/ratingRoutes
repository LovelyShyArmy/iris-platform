import express from "express";
import Rating from "../models/Rating.js";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

const router = express.Router();

const protect = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).send("No token");
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await User.findById(decoded.id);
  next();
};

// Submit rating
router.post("/", protect, async (req, res) => {
  const { supplierId, offerId, stars, comment } = req.body;
  const exists = await Rating.findOne({ rater: req.user._id, supplier: supplierId, offer: offerId });
  if (exists) return res.status(400).json({ msg: "Déjà noté" });

  const rating = await Rating.create({ rater: req.user._id, supplier: supplierId, offer: offerId, stars, comment });

  // Update supplier avg
  const ratings = await Rating.find({ supplier: supplierId });
  const avg = ratings.reduce((a, b) => a + b.stars, 0) / ratings.length;
  await User.findByIdAndUpdate(supplierId, { rating: avg.toFixed(2) });

  res.json(rating);
});

// Get ratings for a supplier
router.get("/:supplierId", async (req, res) => {
  const ratings = await Rating.find({ supplier: req.params.supplierId })
    .populate("rater", "name");
  res.json(ratings);
});

export default router;
