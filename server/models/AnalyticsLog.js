import mongoose from "mongoose";

const analyticsLogSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  type: String, // login, offer_posted, match_run, rating_given, message_sent, alert_opened
  detail: String, // Optional
  timestamp: { type: Date, default: Date.now }
});

export default mongoose.model("AnalyticsLog", analyticsLogSchema);
