// Require express and router
const express = require("express");
const controller = require("./controller");
const cors = require("cors");

// Use dotenv package to parse enviroment variables
const dotenv = require("dotenv");
dotenv.config();

// Use mongoose to connect to database
const mongoose = require("mongoose");
mongoose.connect(
  `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.3e1h8.mongodb.net/mealplan?retryWrites=true&w=majority`
);
const db = mongoose.connection;

const app = express();

// Check connection to database
db.on("error", (err) => {
  console.log(
    `Error occured while connecting to the database. Error code ${err.message}`
  );
});
db.once("open", () => {
  console.log(`Sucessfully connected to the social-site database.`);
});

// Use json parser, cors and router
app.use(express.json());
app.use(cors());
app.use(controller);

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`Social site api listening at http://localhost:${port}`);
});