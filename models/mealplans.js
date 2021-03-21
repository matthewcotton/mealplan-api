const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const mealplanSchema = Schema({
  id: Schema.Types.ObjectId,
  title: String,
  duration: String,
  start_date: String,
  end_date: String,
  recipes: [
    { day: Number, recipe: [{ type: Schema.Types.ObjectId, ref: "Recipe" }] },
  ],
  user: [{ type: Schema.Types.ObjectId, ref: "User" }],
});

module.exports.Mealplan = mongoose.model("Mealplan", mealplanSchema);
