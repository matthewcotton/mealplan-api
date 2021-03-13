const express = require("express");
const router = express.Router();

const authService = require("./Services/authService");
const userService = require("./Services/userService");

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
// Get all recipes

// Get single recipe

// Create new recipe

// Update exisitng recipe

// Delete a recipe

/* Define CRUD operations for mealplans */
// Get all mealplans

// Get single mealplan

// Create new mealplan

// Update exisitng mealplan

// Delete a mealplan

module.exports = router;