const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
      },
      email: {
        type: String,
        required: true
      },
      password: {
        type: String,
        required: true
      },
      date: {
        type: Date,
        default: Date.now
      },
      recipes: [
        {
          type: Schema.Types.ObjectId,
          ref: "Recipe"
        }
      ]
});

const Users = mongoose.model("Users", userSchema)

module.exports = Users;