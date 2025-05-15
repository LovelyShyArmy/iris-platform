import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  type: { type: String }, // message, match, rating, system
  message: { type: String },
  read: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Notification", notificationSchema);


{
  user: ObjectId,
  type: "match" | "message" | "rating" | "system",
  message: "Vous avez été sélectionné...",
  read: Boolean,
  createdAt: Date
}

