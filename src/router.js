const express = require("express");
const router = express.Router();

const authController = require("./Controllers/authController");

/* Authentication */
// router.post("/auth", authController.auth);

/* Define CRUD operations for users */
// Get user data

// Create a new user

// Update username

// Update password

// Delete user


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
