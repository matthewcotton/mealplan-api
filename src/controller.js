const express = require("express");
const router = express.Router();

const authService = require("./Services/authService");
const userService = require("./Services/userService");
const recipeService = require("./Services/recipeService");
const mealplanService = require('./Services/mealplanService');

/* Authentication */
router.post("/auth", authService.auth);

/* Define CRUD operations for users */
// Get user data
router.get("/user/:username", userService.user);
// Create a new user
router.post("/user/add", userService.add);
// Update username
router.patch("/user/username/:username", userService.updateUsername);
// Update password
router.patch("/user/password/:username", userService.updatePassword);
// Delete user
router.delete("/user/:username", userService.delete);

/* Define CRUD operations for recipes */
// Get all recipes of a user
router.get("/recipe", recipeService.readAll)
// Get single recipe
router.get("/recipe/:id", recipeService.readOne)
// Create new recipe
router.post("/recipe/add", recipeService.add);
// Delete a recipe
router.delete("/recipe/:id", recipeService.deleteOne);

/* Define CRUD operations for mealplans */
// Get all mealplans
router.get("/mealplan", mealplanService.readAll)
// Get single mealplan
router.get("/mealplan/:id", mealplanService.readOne)
// Create new mealplan
router.post("/mealplan/add", mealplanService.add);

// Update exisitng mealplan

// Delete a mealplan

module.exports = router;
