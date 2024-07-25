const User = require("../models/userModel")
const jwt = require("jsonwebtoken")

const checkLogin= async(req,res) => {

  const {token} = req.body
  const username = req.params.id

  if(!token) return {check: false}

  console.log("token",token, username)
  
    const decodeData = await jwt.verify(token, process.env.JWT_SECRET)

  const user = await User.findById(decodeData.id)

  console.log(user)
  
  const user2 = await User.findOne({user: username})

  console.log(user,user2)
  if(!user && !user2 && user !== user2){
    return {check: false}
  }

  return {check: true}
}


module.exports = checkLogin