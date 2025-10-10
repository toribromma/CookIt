import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "../config/db.js"; // your mongoose connection
import recipesRouter from "../routes/recipes.js"; // convert to ESM

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API routes
app.use("/api/recipes", recipesRouter);

// Root fallback (optional)
app.get("/", (req, res) => {
  res.json({ message: "API is running" });
});

// Export app for Vercel serverless
export default app;
