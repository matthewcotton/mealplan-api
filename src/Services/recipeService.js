const { Recipe } = require("../../models/recipes");
const authController = require("./authService");

// Get all recipes from a single user (protected)
exports.readAll = async (req, res, next) => {
    // Check token validity
    const user = await authController.tokenCheck(req, res, next);
    if (!user) return;
    try {
        const recipes = await Recipe.find({user: user._id})
        res.send(recipes)
    }
    catch {
        res.status(500).send("Failed request due to server error")
    }
}
// Add recipe (protected)
exports.add = async function (req, res, next) {
  // Check token validity
  const user = await authController.tokenCheck(req, res, next);
  if (!user) {
    return next(res.status(401).send("Authentication failed. No user found."));
  }
  const title = req.body.title;
  const prep_time = req.body.prep_time;
  const cook_time = req.body.cook_time;
  const serves = req.body.serves;
  const ingredients = req.body.ingredients;
  const steps = req.body.steps;
  // Chack all required data is contained within
  if (!title || !prep_time || !cook_time || !serves || !ingredients || !steps) {
    return next(res.status(400).send("All recipe data required."));
  }
  if (!Array.isArray(ingredients) || !Array.isArray(steps)) {
    return next(
      res.status(400).send("The ingredients and steps data must be arrays.")
    );
  }
  // Check that each object in the ingredients array includes the required data
  ingredients.forEach((ingredient) => {
    if (!ingredient.measurement || !ingredient.unit || !ingredient.ingredient) {
      return next(
        res
          .status(400)
          .send(
            "Each object in the ingredients array must include measurement, unit and ingredient data."
          )
      );
    }
  });
  // Check that each object in the steps array includes the required data
  steps.forEach((step) => {
    if (!step.step || !step.instruction) {
      return next(
        res
          .status(400)
          .send(
            "Each object in the steps array must include step and instruction data."
          )
      );
    }
  });
  try {
    const recipe = new Recipe({
      title,
      prep_time,
      cook_time,
      serves,
      ingredients,
      steps,
      user: user._id,
    });
    await recipe.save();
    res.send({ message: "New recipe created" });
  } catch (err) {
    res.status(500).send("Error creating a new recipe document. " + err);
  }
};
