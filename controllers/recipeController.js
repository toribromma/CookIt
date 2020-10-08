const db = require("../models");

// Defining methods for the RecipesController
module.exports = {
  findAll: function(req, res) {
    console.log(req.query.id)
    db.Users.find({_id: req.query.id})
    .populate("recipes")
    .then(dbUser => {
      res.json(dbUser);
    })
    .catch(err => {
      res.json(err);
    });
  },
  // findById: function(req, res) {
  //   db.Recipe.findById(req.params.id)
  //     .then(dbModel => res.json(dbModel))
  //     .catch(err => res.status(422).json(err));
  // },
  create: function(req, res) {
    console.log(req.body)
    db.Recipe.create({
      title: req.body.title,
      thumbnail: req.body.thumbnail,
      href: req.body.href,
      instructions: req.body.instructions,
      ingredients: req.body.ingredients
    })
    .then(({ _id}) => db.Users.findOneAndUpdate({_id:req.body.user}, { $push: { recipes: _id } }, { new: true }))
    .then(dbUser => {
      res.json(dbUser);
    })
    .catch(err => {
      res.json(err);
    });
  },
  // update: function(req, res) {
  //   db.Recipe.findOneAndUpdate({ _id: req.params.id }, req.body)
  //     .then(dbModel => res.json(dbModel))
  //     .catch(err => res.status(422).json(err));
  // },
  // remove: function(req, res) {
  //   db.Recipe.findById({ _id: req.params.id })
  //     .then(dbModel => dbModel.remove())
  //     .then(dbModel => res.json(dbModel))
  //     .catch(err => res.status(422).json(err));
  // },
};
