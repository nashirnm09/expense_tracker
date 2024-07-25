const mongoose = require("mongoose")


const transactionSch = mongoose.Schema({
  user: {
    type: String,
    ref: "User",
    required: true
  },
  amount: {
    type: Number,
    required: [true, "please enter the amount "]
  },
  type: {
    type: String,
    required: [true, "please enter the type"]
  },
  category: {
    type: String,
    requeried: [true, "please enter the category "]
  },
  reference: {
    type: String
  },
  description: {
    type: String,
    required: [true, "please enter the description"]
  },
  date:{
    type: Date,
    required: [true, "Please enter the date"]
  },
  
},{timestamps: true})

const Transaction = mongoose.model("Transaction", transactionSch)


module.exports  = Transaction
