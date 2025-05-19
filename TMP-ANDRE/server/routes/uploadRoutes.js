import express from "express";
import upload from "../middleware/upload.js";
import jwt from "jsonwebtoken";
import fs from "fs";

const router = express.Router();

const protect = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).send("No token");
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.user = decoded;
  next();
};

// Upload route
router.post("/", protect, upload.single("file"), (req, res) => {
  const file = req.file;
  if (!file) return res.status(400).send("Aucun fichier");
  res.json({ filename: file.filename, url: `/uploads/${file.filename}` });
});

export default router;
