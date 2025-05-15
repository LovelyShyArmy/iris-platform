import mongoose from "mongoose";

const offerSchema = new mongoose.Schema({
  type: { type: String, enum: ['offer', 'need'], required: true },
  title: String,
  description: String,
  industry: String,
  deadline: Date,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

export default mongoose.model("Offer", offerSchema);
