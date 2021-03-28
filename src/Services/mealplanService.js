const { Mealplan } = require ('../../models/mealplans');
const authController = require ('./authService');
var { DateTime } = require('luxon');
const { Recipe } = require("../../models/recipes");
const { ObjectId } = require('bson');


// Get all mealplans from a single user (protected)
exports.readAll = async (req, res, next) => {
    // Check token validity
    const user = await authController.tokenCheck(req, res, next);
    if (!user) return;
    try {
        const mealplans = await Mealplan.find({user: user._id})
        res.send(mealplans)
    }
    catch {
        res.status(500).send("Failed request due to server error")
    }
}
//get single meal plan based on ID
exports.readOne = async (req, res, next) => {
    const user = await authController.tokenCheck(req, res, next);
    if (!user) {
      res.status(401).send("Authentication failed. No user found.")
    }
    try {
        const mealplan = await Mealplan.findOne({ _id: ObjectId(req.params.id) })
        res.status(200).send(mealplan)
    } catch {
        res.status(404).send(`No meal plan found with id ${req.params.id}`)
    }
}

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