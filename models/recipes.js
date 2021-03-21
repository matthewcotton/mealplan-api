const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const recipeSchema = Schema({
  id: Schema.Types.ObjectId,
  title: String,
  prep_time: String,
  cook_time: String,
  serves: String,
  ingredients: [{ measurement: Number, unit: String, ingredient: String }],
  steps: [{ step: String, instruction: String }],
  user: { type: Schema.Types.ObjectId, ref: "User" },
});

module.exports.Recipe = mongoose.model("Recipe", recipeSchema);
