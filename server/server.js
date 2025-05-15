// server.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import { createServer } from "http";
import { Server } from "socket.io";
import path from "path";
import { fileURLToPath } from "url";

// ENV + DB setup
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Real-time server
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

// Socket users
let onlineUsers = new Map();
io.on("connection", (socket) => {
  console.log("🔌 User connected");

  socket.on("register", (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on("disconnect", () => {
    for (const [uid, sid] of onlineUsers.entries()) {
      if (sid === socket.id) onlineUsers.delete(uid);
    }
  });
});

// Attach to app
app.set("io", io);
app.use(cors());
app.use(express.json());

// Static file serving
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ DB connection error:", err));

// ROUTES
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import offerRoutes from "./routes/offerRoutes.js";
import matchRoutes from "./routes
