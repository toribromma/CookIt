// /api/recipesController.js (or in lib/controllers/recipesController.js if you’re using routes)

import axios from "axios";
import dotenv from "dotenv";
import db from "../models/index.js"; // Ensure your models/index.js exports a default object

dotenv.config();

// Helper: handle async/await errors gracefully
const handleError = (res, err) => {
  console.error(err);
  res.status(500).json({ error: err.message || "Internal Server Error" });
};

// Controller object
const RecipesController = {
  async findAll(req, res) {
    try {
      const recipes = await db.Recipe.find({ user: req.query.q });
      res.status(200).json(recipes);
    } catch (err) {
      handleError(res, err);
    }
  },

  async findById(req, res) {
    try {
      const recipe = await db.Recipe.findById(req.params.id);
      res.status(200).json(recipe);
    } catch (err) {
      handleError(res, err);
    }
  },

  async create(req, res) {
    try {
      const { url, user } = req.body;

      const response = await axios.get(
        `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/extract`,
        {
          params: { url },
          headers: {
            "X-RapidAPI-Key": process.env.API_KEY,
            "X-RapidAPI-Host":
              "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
          },
        }
      );

      const {
        sourceUrl,
        title,
        image,
        extendedIngredients,
        cuisines,
        analyzedInstructions,
      } = response.data;

      const ingredientsArray = extendedIngredients.map((i) => i.original);
      const cuisineString = cuisines.join(", ");
      const instructions =
        analyzedInstructions?.[0]?.steps?.map((s) => s.step) || [];

      const recipe = {
        title,
        thumbnail: image,
        href: sourceUrl,
        ingredients: ingredientsArray,
        instructions,
        user,
        cuisine: cuisineString,
      };

      const newRecipe = await db.Recipe.create(recipe);
      res.status(201).json(newRecipe);
    } catch (err) {
      handleError(res, err);
    }
  },

  async update(req, res) {
    try {
      const { q, r, s, t } = req.body.params;
      const updated = await db.Recipe.findByIdAndUpdate(
        req.params.id,
        {
          title: q,
          ingredients: r,
          instructions: s,
          cuisine: t,
        },
        { new: true }
      );
      res.status(200).json(updated);
    } catch (err) {
      handleError(res, err);
    }
  },

  async remove(req, res) {
    try {
      const deleted = await db.Recipe.findByIdAndDelete(req.params.id);
      res.status(200).json(deleted);
    } catch (err) {
      handleError(res, err);
    }
  },

  async searchRecipes(req, res) {
    try {
      const response = await axios.get(
        `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/complexSearch`,
        {
          params: { query: req.params.id, number: 5 },
          headers: {
            "X-RapidAPI-Key": process.env.API_KEY,
            "X-RapidAPI-Host":
              "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
          },
        }
      );

      res.status(200).json(response.data.results);
    } catch (err) {
      handleError(res, err);
    }
  },

  async getNewRecipe(req, res) {
    try {
      const response = await axios.get(
        `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${req.params.id}/information`,
        {
          headers: {
            "X-RapidAPI-Key": process.env.API_KEY,
            "X-RapidAPI-Host":
              "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
          },
        }
      );

      const {
        sourceUrl,
        title,
        image,
        extendedIngredients,
        cuisines,
        analyzedInstructions,
      } = response.data;

      const ingredientsArray = extendedIngredients.map((i) => i.original);
      const cuisineString = cuisines.join(", ");
      const instructions =
        analyzedInstructions?.[0]?.steps?.map((s) => s.step) || [];

      const recipe = {
        title,
        thumbnail: image,
        href: sourceUrl,
        ingredients: ingredientsArray,
        instructions,
        cuisine: cuisineString,
      };

      res.status(200).json(recipe);
    } catch (err) {
      handleError(res, err);
    }
  },

  async saveNewRecipe(req, res) {
    try {
      const newRecipe = await db.Recipe.create(req.body);
      res.status(201).json(newRecipe);
    } catch (err) {
      handleError(res, err);
    }
  },
};

export default RecipesController;

