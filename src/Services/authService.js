const createErr = require("http-errors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../../models/users");
const { RequestTimeout } = require("http-errors");

const dotenv = require("dotenv");
dotenv.config();

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
      user.token = jwt.sign(
        {
          id: user.id,
          username: user.username,
        },
        process.env.JWT_SECRET,
        { expiresIn: "60 days" }
      );
      await user.save();
      res.send({ token: user.token, username: user.username });
    }
  });
};

// Token Check
exports.tokenCheck = async function (req, res, next) {
  const token = req.headers["authorization"];
  if (!token)
    return next(
      createErr(401, "Authentication failed. No token included with request.")
    );
  jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
    if (err) next(createErr(500, "Authentication failed. JWT verify error."));
    const user = User.findById(decoded.id);
    if (user) {
      return user;
    } else {
      next(createErr(401, "Authentication failed. No user found."));
    }
  });
};
