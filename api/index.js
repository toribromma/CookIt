import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import recipesRouter from "../routes/recipes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB (cached connection)
if (!global.mongooseConnection) {
  global.mongooseConnection = mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

// Register routes
app.use("/api/recipes", recipesRouter);

// Export Express to Vercel
export default app;
