import dotenv from 'dotenv';
dotenv.config();
import connectDB from "./utils/db"

import { app } from './app';

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
  connectDB();
});
