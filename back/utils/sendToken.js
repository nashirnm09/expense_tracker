const expressAsyncHandler = require("express-async-handler");

const sendToken = expressAsyncHandler(async (user, statusCode, res) => {
  const token = await user.getJWTToken();

  const option = {
    maxAge: process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000,
    httpOnly: true,
  };

  res.status(statusCode).cookie("token", token, option).json({
    success: true,
    token: token,
    user,
  });
});

module.exports = sendToken;
