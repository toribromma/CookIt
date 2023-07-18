const db = require("../models");
const axios = require("axios");
const dotenv = require("dotenv").config(
  // {path: "../.env"}
  );


// Defining methods for the RecipesController
module.exports = {
  findAll: async function(req, res) {
    console.log(req.query.q)
    db.Recipe.find({user: req.query.q})
    .then(dbUser => {
      // console.log("Hi")
      // console.log(dbUser)
      res.json(dbUser);
    })
    .catch(err => {
      res.json(err);
    });
  },
  create: async function(req, res) {
    console.log(req.body)

      const response = await axios
        .get(
          `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/extract?url=${req.body.url}`,
          {
            headers: {
              "Content-Type": "application/json",
              "X-RapidApi-Host":
                "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
              "X-RapidApi-Key": process.env.API_KEY
            },
          }
        )
      // .then(async (response) => {
        const {
          sourceUrl,
          title,
          image,
          analyzedInstructions: [
            {
              steps: [...steps],
            },
          ],
          extendedIngredients: [...ingredients],
        } = response.data;

        console.log(response.data);

        let instructions = steps.map((i) => i.step);
        let ingredientsArray = ingredients.map((i) => i.original);

        const recipe = {
          title: title,
          thumbnail: image,
          href: sourceUrl,
          instructions: instructions,
          ingredients: ingredientsArray,
          user: req.body.user,
        };

        console.log(recipe)

    db.Recipe.create(recipe)
    // .then(({ _id}) => db.Users.findOneAndUpdate({_id:req.body.user}, { $push: { recipes: _id } }, { new: true }))
    .then(dbUser => {
      res.json(dbUser);
    })
    .catch(err => {
      res.json(err);
    });
  },
  update: function(req, res) {
    console.log("hi")
    console.log(req.params.id)
    console.log(req.body)
    db.Recipe.findOneAndUpdate({ _id: req.params.id }, {title: req.body.title})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    // console.log("Hi")
    // console.log(req.params.id)
    db.Recipe.findById({ _id: req.params.id })
    // console.log(req.body.id)
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
    // db.Recipe.findOneAndUpdate({_id:req.params.id}, req.body)
    //   .then(dbModel => res.json(dbModel))
    //   .catch(err => res.status(422).json(err));
  },
};
