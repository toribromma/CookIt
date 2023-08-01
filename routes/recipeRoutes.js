const express = require("express");
const router = express.Router();
const recipeController = require("../controllers/recipeController");

// Matches with "/api/recipes"
router.route("/").get(recipeController.findAll).post(recipeController.create);

// Matches with "/api/recipes/:id"
router
  .route("/:id")
  .delete(recipeController.remove)
  .put(recipeController.update)
  .get(recipeController.findById);
router
.route("/search/:id")
.get(recipeController.searchRecipes);
router
.route("/new/search/:id")
.get(recipeController.getNewRecipe)
router
.route("/new")
.post(recipeController.saveNewRecipe)

module.exports = router;
