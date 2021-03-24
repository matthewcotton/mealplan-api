const { Mealplan } = require ('../../models/mealplans');
const authController = require ('./authService');
var { DateTime } = require('luxon');
const { Recipe } = require("../../models/recipes");

exports.add = async function (req, res, next) {
    // Check token validity
    const user = await authController.tokenCheck(req, res, next);
    if (!user) {
      return next(res.status(401).send("Authentication failed. No user found."));
    }
     const title = req.body.title;
     const duration = req.body.duration;
     const start_date = req.body.start_date;
     const end_date = DateTime.fromISO(start_date).plus({days:duration});
     if (!title || !duration || !start_date || !end_date ) {
        return next(res.status(400).send("All Mealplan data required."));
     }
     const docs = await Recipe.aggregate([{ $match: { 'user':user._id } }]).sample(Number(duration));
     const recipes = docs.map((recipe, index) => {
         return {
             day: index + 1,
             recipe: recipe._id
         }
     }) 
     try {
         const mealplan = new Mealplan ({
             title,
             duration,
             start_date,
             end_date,
             recipes,
             user: user._id,
         })
         await mealplan.save();
         res.send({ message: "New mealplan created" });
       } catch (err) {
         res.status(500).send("Error creating a new mealplan document. " + err);
       }
     };