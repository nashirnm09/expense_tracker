const expressAsyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const ErrorHandler = require("../utils/errorHandler");

const auth = expressAsyncHandler(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new ErrorHandler("Please Login to access this route", 404));
  }

  const decodeData = await jwt.verify(token, process.env.JWT_SECRET);

  const user = await User.findById(decodeData.id);

  if (!user) {
    return next(
      res.status(500).json({
        success: false,
        message: "Please Login to access this route",
      })
    );
  }

  req.user = user;
  next();
});

module.exports = auth;
