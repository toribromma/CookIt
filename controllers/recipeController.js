const db = require("../models");

// Defining methods for the RecipesController
module.exports = {
  findAll: async function(req, res) {
    // console.log(req.body)
    db.Recipe.find({user: { $regex: new RegExp(req.query.q, 'i')}})
    .then(dbUser => {
      // console.log("Hi")
      // console.log(dbUser)
      res.json(dbUser);
    })
    .catch(err => {
      res.json(err);
    });
  },
  create: function(req, res) {
    console.log(req.body)
    db.Recipe.create(req.body)
    // .then(({ _id}) => db.Users.findOneAndUpdate({_id:req.body.user}, { $push: { recipes: _id } }, { new: true }))
    .then(dbUser => {
      res.json(dbUser);
    })
    .catch(err => {
      res.json(err);
    });
  },
  update: function(req, res) {
    console.log(req.body.id)
    db.Recipe.findOneAndUpdate({ _id: req.body.id }, {title: req.body.title})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    db.Recipe.findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
    db.Users.update(
      {"recipes":req.params.id},
      {"$pull": {"recipes": req.params.id}})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};
