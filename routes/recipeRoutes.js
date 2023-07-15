const express = require('express')
const router = express.Router()
const recipeController = require("../controllers/recipeController");


// Matches with "/api/posts"
router
  .route("/")
  .get(recipeController.findAll)
  .post(recipeController.create);

// Matches with "/api/posts/:id"
router
  .route("/:id")

  .delete(recipeController.remove)
  .put(recipeController.update);
  
module.exports = router;
