const Transaction = require("../models/transactionModel")
const User = require("../models/userModel")
const checkLogin = require("../utils/checkLogin")
const jwt = require('jsonwebtoken')
const moment = require('moment')

exports.getAllTransaction = async (req, res, next) => {

  const username = req.params.id

  let { frequency, type, selectDate } = req.body

  if (!username) {
    return next(
      res.status(500).json({
        success: false,
        message: "username not found",
      })
    )
  }



  const user = await User.findOne({ username })
  if (!user) {
    return next(
      res.status(500).json({
        success: false,
        message: "user not found",
      })
    )
  }


  const data = await Transaction.find({
    ...(frequency !== "custom" ? {
      date: {
        $gt: moment().subtract(Number(frequency), 'days').toDate()
      }
    } : {
      date: {
        $gte: selectDate[0],
        $lte: selectDate[1]
      }
    }),
    user: req.params.id,
    ...(type !== 'all' && { type })
  })

  res.status(200).json({
    success: true,
    data
  })
}

exports.updateTransaction = async (req, res, next) => {
  const { id } = req.params
  const reso = await Transaction.findOneAndUpdate({ _id: req.body.id }, req.body.values)
  if (!reso) {
    return next(
      res.status(500).json({
        success: false,
        error: "res not found"
      })
    )
  }
  res.status(200).json({
    success: true,
    reso,
    id
  })
}

exports.addTranscation = async (req, res, next) => {
  let { amount, description, reference, date, category, type } = req.body

  const username = req.params.id

  const user = await User.findOne({ username })

  if (!user) {
    return next(
      res.status(500).json({
        success: false,
        message: "user not found"
      })
    )
  }

  if (!amount || !description || !reference || !date || !category || !type) {
    return next(
      res.status(401).json({
        success: false,
        message: "Please enter all the required fields "
      })
    )
  }

  const newTransaction = new Transaction({ amount, description, reference, date, category, type, user: username })

  await newTransaction.save()

  res.status(200).json({
    success: true,
    data: newTransaction
  })
}

exports.deleteTransaction = async(req, res, next) => {
  const reso = await Transaction.findOneAndDelete({ _id: req.body.id })
  if (!reso) {
    return next(
      res.status(500).json({
        success: false,
        error: "res not found"
      })
    )
  }
  res.status(200).json({
    success: true,
    reso,
  })
}

