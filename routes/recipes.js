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

// ✅ Serve favicon and other static files during development
app.use(express.static(path.join(__dirname, "client", "public")));

// ✅ API Routes
app.use("/api/recipes", require("./routes/recipes"));

// ✅ Serve React build (production)
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client", "build")));

  // Handle React routing, return all requests to index.html
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
}

// ✅ Optional: Explicit favicon handler (safeguard)
app.get("/favicon.ico", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "public", "favicon.ico"));
});

app.listen(PORT, () => {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});
