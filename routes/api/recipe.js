const router = require("express").Router();
const recipeController = require("../../controllers/recipeController");


// Matches with "/api/posts"
router
  .route("/")
  .get(recipeController.findAll)
  .post(recipeController.create)
  .put(recipeController.update)
// Matches with "/api/posts/:id"
router
  .route("/:id")
//   .get(postsController.findById)

  .delete(recipeController.remove);

module.exports = router;
