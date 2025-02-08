import "dotenv/config";
import connectDB from "./db/index.js"
import { app } from "./app.js";

// connect DB
connectDB();
app();