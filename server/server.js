import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

import offerRoutes from "./routes/offerRoutes.js";
app.use("/api/offers", offerRoutes);

import auditRoutes from "./routes/auditRoutes.js";
app.use("/api/audit", auditRoutes);

import messageRoutes from "./routes/messageRoutes.js";
app.use("/api/messages", messageRoutes);

import matchRoutes from "./routes/matchRoutes.js";
app.use("/api/match", matchRoutes);

import ratingRoutes from "./routes/ratingRoutes.js";
app.use("/api/ratings", ratingRoutes);

import uploadRoutes from "./routes/uploadRoutes.js";
app.use("/api/upload", uploadRoutes);
app.use("/uploads", express.static("uploads")); // Serve files

import adminRoutes from "./routes/adminRoutes.js";
app.use("/api/admin", adminRoutes);

import notificationRoutes from "./routes/notificationRoutes.js";
app.use("/api/notifications", notificationRoutes);
