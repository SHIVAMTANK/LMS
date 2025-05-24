import dotenv from 'dotenv';
dotenv.config();
import connectDB from "./utils/db"
import express from 'express'
import {v2 as cloudinary} from 'cloudinary'
cloudinary.config({
  cloud_name:process.env.CLOUD_NAME,
  api_key:process.env.CLOUD_API_KEY,
  api_secret:process.env.CLOUD_SECRET_KEY
});

import { app } from './app';

const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
  connectDB();
});
