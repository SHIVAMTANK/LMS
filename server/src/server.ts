import dotenv from 'dotenv';
dotenv.config();
import connectDB from "./utils/db"
import express from 'express'

import { app } from './app';

const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
  connectDB();
});
