import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
const dbUrl: string = process.env.DB_URI || "";
// console.log(dbUrl);

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(dbUrl);
    console.log(`✅ Database connected with ${connection.connection.host}`);
  } catch (error: any) {
    console.error("❌ MongoDB connection error:", error.message);
    setTimeout(connectDB, 5000); // Retry connection after 5 seconds
  }
};

export default connectDB;
