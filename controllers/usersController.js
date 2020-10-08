const db = require("../models");
const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const keys = require("../../config/keys");
// Load input validation
const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");
const { Users } = require("../models");

// Load User model
module.exports = {
  create: function(req,res) {
            // Form validation
  const { errors, isValid } = validateRegisterInput(req.body);
  // Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }
  db.Users.findOne({ email: req.body.email }).then(user => {
      if (user) {
        return res.status(400).json({ email: "Email already exists" });
      } else {
        const newUser = new Users({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password
        });
  // Hash password before saving in database
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => res.json(user))
              .catch(err => console.log(err));
          });
        });
      }
    });
  },
  login: function(req,res) {
    const { errors, isValid } = validateLoginInput(req.body);
// Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }
    const email = req.body.email;
    const password = req.body.password;
      // Find user by email
    Users.findOne({ email }).then(user => {
    // Check if user exists
      if (!user) {
        return res.status(404).json({ emailnotfound: "Email not found" });
      }
      bcrypt.compare(password, user.password).then(isMatch => {
        if (isMatch) {
          return res.json(user)
        }
        else {
          
        }
      })
    })
  }
}