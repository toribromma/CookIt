const express = require("express");
const path = require("path");
const dotenv = require("dotenv").config();
const connectDB = require("./config/db");
const PORT = process.env.PORT || 3001;

connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve up static assets in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// API routes
app.use('/api/recipes', require('./routes/recipeRoutes'));

// ✅ Explicit favicon handler
app.get("/favicon.ico", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "public", "favicon.ico"));
});

// React routing fallback
app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(PORT, function() {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});
