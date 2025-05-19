import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['buyer', 'supplier'], default: 'supplier' },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.matchPassword = function (entered) {
  return bcrypt.compare(entered, this.password);
};

export default mongoose.model("User", userSchema);

region: { type: String, default: "N/A" }

available: { type: Boolean, default: false },
rating: { type: Number, default: 3.5 }, // Avg client score
tags: [String], // ["Aéronautique", "Énergie", "Défense"]
industry: String
