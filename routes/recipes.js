import express from "express";
import recipeController from "../controllers/recipeController.js";

const router = express.Router();

router.route("/")
  .get(recipeController.findAll)
  .post(recipeController.create);

router.route("/:id")
  .get(recipeController.findById)
  .put(recipeController.update)
  .delete(recipeController.remove);

router.route("/search/:id")
  .get(recipeController.searchRecipes);

router.route("/new/search/:id")
  .get(recipeController.getNewRecipe);

router.route("/new")
  .post(recipeController.saveNewRecipe);

export default router;
