const mongoose = require("mongoose");
const dotenv = require('dotenv').config();
const connectDB = async () => {
    try {
      mongoose.connect(
        process.env.MONGO_URI || 
        "mongodb://localhost/reactrecipes",
        { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true }
      );
      
      
    } catch (error) {
      console.log(error)
      process.exit(1)
    }
  }

  module.exports = connectDB;
