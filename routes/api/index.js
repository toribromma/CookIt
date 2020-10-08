const router = require("express").Router();
const recipeRoutes = require("./recipe");
const userRoutes = require("./users")
// Post routes
router.use("/recipe", recipeRoutes);
router.use("/users", userRoutes)
module.exports = router;

