const createErr = require("http-errors");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
const { User } = require("../../models/users");

// Authentication
exports.auth = async function (req, res, next) {
  // Username check
  const user = await User.findOne({
    username: req.body.username.toLowerCase(),
  });
  if (!user) {
    return next(createErr(401, "Incorrect username"));
  }
  // Password check
  bcrypt.compare(req.body.password, user.password, async (err, result) => {
    err && next(createErr(500, "Password encrypting error"));
    if (!result) {
      return next(createErr(403, "Incorrect password"));
    } else {
      user.token = uuidv4();
      await user.save();
      res.send({ token: user.token, username: user.username });
    }
  });
};

// Token Check
exports.tokenCheck = async function (req, res, next) {
  const authHeader = req.headers["authorization"];
  const user = await User.findOne({ token: authHeader });
  if (user) {
    return user;
  } else {
    next(createErr(401, "Authentication failed"));
  }
};
