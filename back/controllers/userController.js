const express = require("express");
const User = require("../models/userModel");
const sendToken = require("../utils/sendToken");
const jwt = require("jsonwebtoken");

exports.loginUser = async (req, res, next) => {
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
};

exports.createUser = async (req, res, next) => {
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
};

exports.getUser = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(
      res.status(500).json({
        success: false,
        message: "Please Login to access this route",
      })
    );
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

  res.status(200).json({
    success: true,
    user,
  });
};
