const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");
const app = express();
const PORT = process.env.PORT || 3001;
const dotenv = require("dotenv");
const passport = require("passport")
dotenv.config();

const uri = process.env.REACT_APP_MONGO_URI

// Define middleware here
app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Passport middleware
app.use(passport.initialize());
// Passport config
// require("./config/passport")(passport);
// Routes
// Add routes, both API and view
app.use(routes);

// Connect to the Mongo DB
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Start the API server
app.listen(PORT, function () {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});