import dotenv from "dotenv";
dotenv.config();

import connectDB from "./utils/db";
import express from "express";
import { v2 as cloudinary } from "cloudinary";
import { app } from "./app";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_SECRET_KEY,
});

const PORT = process.env.PORT || 5000;

// ✅ No need to call express.json() or urlencoded() again here
// It's already handled in app.ts

console.log("🔐 ENV Loaded in server.ts:", process.env.VDOCIPHER_API_SECRET);

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
  connectDB();
});
