const express = require("express");
const router = express.Router();

const authController = require("./Controllers/authController");
const userController = require("./Controllers/userController");

/* Authentication */
router.post("/auth", authController.auth);

/* Define CRUD operations for users */
// Get user data
router.get("/user/:username", userController.user);
// Create a new user
router.post("/user/add", userController.add);
// Update username
router.patch("/user/username/:username", userController.updateUsername);
// Update password
router.patch("/user/password/:username", userController.updatePassword);
// Delete user
router.delete("/user/:username", userController.delete);

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
