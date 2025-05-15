import mongoose from "mongoose";

const ratingSchema = new mongoose.Schema({
  rater: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // buyer
  supplier: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  offer: { type: mongoose.Schema.Types.ObjectId, ref: "Offer" },
  stars: { type: Number, min: 1, max: 5 },
  comment: String,
}, { timestamps: true });

export default mongoose.model("Rating", ratingSchema);
