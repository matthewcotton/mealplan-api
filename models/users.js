const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  username: String,
  password: String,
  token: String,
});

module.exports.User = mongoose.model("User", userSchema);
