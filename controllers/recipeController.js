const db = require("../models");
const axios = require("axios");
const dotenv = require("dotenv")
  .config
  // {path: "../.env"}
  ();

// Defining methods for the RecipesController
module.exports = {
  findAll: async function (req, res) {
    // console.log(req.query.q);
    // console.log("hi");
    db.Recipe.find({ user: req.query.q })
      .then((dbUser) => {
        // console.log("Hi")
        // console.log(dbUser)
        res.json(dbUser);
      })
      .catch((err) => {
        res.json(err);
      });
  },
  findById: function (req, res) {
    db.Recipe.findById(req.params.id)
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
  create: async function (req, res) {
    console.log(req.body);

    const response = await axios.get(
      `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/extract?url=${req.body.url}`,
      {
        headers: {
          "Content-Type": "application/json",
          "X-RapidApi-Host":
            "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
          "X-RapidApi-Key": process.env.API_KEY,
        },
      }
    );
    const {
      sourceUrl,
      title,
      image,

      extendedIngredients: [...ingredients],
      cuisines,
    } = response.data;

    let ingredientsArray = ingredients.map((i) => i.original);
    let cuisineString = cuisines.toString();
    let instructions;

    if (!response.data.analyzedInstructions[0]) {
      instructions = [];
    } else {
      instructions = response.data.analyzedInstructions[0].steps.map(
        (step) => step.step
      );
    }

    const recipe = {
      title: title,
      thumbnail: image,
      href: sourceUrl,
      instructions: instructions,
      ingredients: ingredientsArray,
      user: req.body.user,
      cuisine: cuisineString,
    };

    console.log(recipe);

    db.Recipe.create(recipe)
      // .then(({ _id}) => db.Users.findOneAndUpdate({_id:req.body.user}, { $push: { recipes: _id } }, { new: true }))
      .then((dbUser) => {
        res.json(dbUser);
      })
      .catch((err) => {
        res.json(err);
      });
  },
  update: function (req, res) {
    db.Recipe.findOneAndUpdate(
      { _id: req.params.id },
      {
        title: req.body.params.q,
        ingredients: req.body.params.r,
        instructions: req.body.params.s,
        cuisine: req.body.params.t,
      }
    )
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
  remove: function (req, res) {
    db.Recipe.findById({ _id: req.params.id })
      .then((dbModel) => dbModel.remove())
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
  searchRecipes: async function (req, res) {
    console.log("hi");
    console.log(req.params.id);

    const response = await axios.get(
      `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/complexSearch`,

      {
        params: {
          query: req.params.id,
          number: 5,
        },
        headers: {
          "Content-Type": "application/json",
          "X-RapidApi-Host":
            "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
          "X-RapidApi-Key": process.env.API_KEY,
        },
      }
    );

    console.log(response.data.results);

    res.json(response.data.results);
  },
  getNewRecipe: async function (req, res) {
    console.log(req.params.id);
    const options = {
      method: "GET",
      url: `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${req.params.id}/information`,
      headers: {
        "X-RapidAPI-Key": process.env.API_KEY,
        "X-RapidAPI-Host":
          "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(options);
      const {
        sourceUrl,
        title,
        image,

        extendedIngredients: [...ingredients],
        cuisines,
      } = response.data;

      let ingredientsArray = ingredients.map((i) => i.original);
      let cuisineString = cuisines.toString();
      let instructions;

      if (!response.data.analyzedInstructions[0]) {
        instructions = [];
      } else {
        instructions = response.data.analyzedInstructions[0].steps.map(
          (step) => step.step
        );
      }

      const recipe = {
        title: title,
        thumbnail: image,
        href: sourceUrl,
        instructions: instructions,
        ingredients: ingredientsArray,
        user: req.body.user,
        cuisine: cuisineString,
      };

      // console.log(recipe);
      res.json(recipe);
    } catch (error) {
      console.error(error);
    }
  },
  saveNewRecipe: async function (req, res) {
    console.log(req.body);

    db.Recipe.create(req.body)
      .then((dbUser) => {
        res.json(dbUser);
      })
      .catch((err) => {
        res.json(err);
      });
  },
};
