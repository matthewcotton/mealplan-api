const createErr = require("http-errors");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const { User } = require("../../models/users");
const authController = require("./authService");

// Get user data (protected)
exports.user = async function (req, res, next) {
  authController.tokenCheck(req, res, next);
  const user = await User.findOne(
    {
      token: req.headers["authorization"],
      username: req.params.username.toLowerCase(),
    },
    "-_id -password -token"
  );
  if (!user) {
    return next(
      createErr(404, `No user found with username ${req.params.username}`)
    );
  }
  res.send(user);
};

// Add user (unprotected)
exports.add = async function (req, res, next) {
  // Check username and password are included in the body
  if (!req.body.username || !req.body.password) {
    return next(createErr(400, "Username and password required"));
  }
  // Check username doesn't already exisit
  const existingUser = await User.find({
    username: req.body.username.toLowerCase(),
  });
  if (existingUser.length) {
    return next(createErr(409, "Username already exists"));
  }
  // Hash password
  bcrypt.hash(req.body.password, saltRounds, async (err, hash) => {
    if (err) {
      return next(createErr(500, "Password encrypting error"));
    }
    const user = new User({
      username: req.body.username.toLowerCase(),
      password: hash,
    });
    await user.save();
    res.send({ message: "New user profile created" });
  });
};

// Update users password (protected)
exports.updatePassword = async function (req, res, next) {
  authController.tokenCheck(req, res, next);
  // Check username and password are included in the body
  if (!req.body.new_password) {
    return next(createErr(400, "New password required"));
  }
  // Update password
  bcrypt.hash(req.body.new_password, saltRounds, async (err, hash) => {
    if (err) {
      return next(createErr(500, "Password encrypting error"));
    }
    const user = await User.findOneAndUpdate(
      {
        token: req.headers["authorization"],
        username: req.params.username.toLowerCase(),
      },
      { password: hash }
    );
    if (!user) {
      return next(
        createErr(404, `No user found with username ${req.params.username}`)
      );
    } else {
      res.send({ message: "User profile updated" });
    }
  });
};

// Update users username (protected)
exports.updateUsername = async function (req, res, next) {
  authController.tokenCheck(req, res, next);
  // Update username
  if (req.body.new_username) {
    const user = await User.findOneAndUpdate(
      {
        token: req.headers["authorization"],
        username: req.params.username.toLowerCase(),
      },
      { username: req.body.new_username.toLowerCase() }
    );
    if (!user) {
      return next(
        createErr(404, `No user found with username ${req.params.username}`)
      );
    }
  } else {
    return next(createErr(404, "New username is required"));
  }
  res.send({ message: "User profile updated" });
};

// Delete user (protected)
exports.delete = async function (req, res, next) {
  authController.tokenCheck(req, res, next);
  const user = await User.findOneAndDelete({
    token: req.headers["authorization"],
    username: req.params.username.toLowerCase(),
  });
  if (!user) {
    return next(
      createErr(404, `No user found with username ${req.params.username}`)
    );
  }
  res.send({ message: "User profile deleted" });
};
