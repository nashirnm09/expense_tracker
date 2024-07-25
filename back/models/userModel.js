const mongoose = require("mongoose")
const validator = require("validator")
const jwt = require('jsonwebtoken')


const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your name"]
  },

  username: {
    type: String,
    required: [true, "please enter your username"],
    unique: [true, "please enter valid username"]
  },
  
  email: {
    type: String,
    required: [true, "Please enter your email"],
    unique: true,
    validator: [validator.isEmail, "please enter valid email"]
  },

  password: {
    type: String,
    required: [true, "Please enter your password "]
  }
}, { timestamps: true })

userSchema.methods.getJWTToken = function() {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE
  })
}

const User = mongoose.model("User", userSchema)

module.exports = User;

