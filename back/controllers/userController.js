const User = require("../models/userModel");
const sendToken = require("../utils/sendToken");
const expressAsyncHandler = require("express-async-handler");

exports.loginUser = expressAsyncHandler(async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return next(
      res.status(400).json({
        success: false,
        message: "please fill field",
      })
    );
  }
  const user = await User.findOne({ username });

  if (!user) {
    return next(
      res.status(404).json({
        success: false,
        message: "invalid email and password",
      })
    );
  }

  if (user.password !== password) {
    return next(
      res.status(404).json({
        success: false,
        message: "invalid email and password",
      })
    );
  }

  sendToken(user, 200, res);
});

exports.createUser = expressAsyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!email || !name || !password) {
    return next(
      res.status(400).json({
        success: false,
        message: "please fill field",
      })
    );
  }

  const user = await User.create(req.body);

  sendToken(user, 200, res);
});

exports.getUser = expressAsyncHandler(async (req, res, next) => {
  const user = req.user;

  sendToken(user, 200, res);
});
