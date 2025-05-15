import mongoose from "mongoose";

const auditSchema = new mongoose.Schema({
  company: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  certifications: [String],
  capacityScore: Number, // 0–50
  complianceScore: Number, // 0–50
  totalScore: Number, // capacityScore + complianceScore
  notes: String,
}, { timestamps: true });

export default mongoose.model("Audit", auditSchema);
