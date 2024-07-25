

const sendToken = async(user, statusCode, res) => {
  const token = await user.getJWTToken()

  const option = {
    expiresIn: new Date( Date.now() + process.env.COOKIES_EXPIRE * 24 * 60 *60 * 10000),
    httpOnly: true
  }

  res.cookie("token", token, option)


  console.log(token)
  res.status(statusCode).json({
    success: true,
    token: token,
    user
  })
}

module.exports = sendToken