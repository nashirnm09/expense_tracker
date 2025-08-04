const Transaction = require("../models/transactionModel");
const moment = require("moment");
const expressAsyncHandler = require("express-async-handler");
const ErrorHandler = require("../utils/errorHandler");

exports.getAllTransaction = expressAsyncHandler(async (req, res, next) => {
  // console.log(req.query);
  let { frequency, type, date } = req.query;

  if (date) {
    date = date.split(",");
  }

  const transaction = await Transaction.find({
    ...(frequency !== "custom"
      ? {
          date: {
            $gt: moment().subtract(Number(frequency), "days").toDate(),
          },
        }
      : {
          date: {
            $gte: date[0] + "," + date[1],
            $lte: date[2] + "," + date[3],
          },
        }),
    user: req.user,
    ...(type !== "all" && { type }),
  });

  res.status(200).json({
    success: true,
    transaction,
  });
});

exports.updateTransaction = async (req, res, next) => {
  let { amount, description, reference, date, category, type } = req.body;
  const { id } = req.params;

  if (!amount || !description || !reference || !date || !category || !type) {
    return next(new ErrorHandler("please fill all required fields", 403));
  }

  const transaction = await Transaction.findOneAndUpdate(
    { _id: id, user: req.user._id },
    { amount, description, reference, date, category, type }
  );
  if (!transaction) {
    return next(new ErrorHandler("transaction not found", 404));
  }
  res.status(200).json({
    success: true,
    transaction,
    message: "Transaction updated successfully",
  });
};

exports.addTranscation = async (req, res, next) => {
  let { amount, description, reference, date, category, type } = req.body;

  if (!amount || !description || !reference || !date || !category || !type) {
    return next(
      res.status(401).json({
        success: false,
        message: "Please enter all the required fields ",
      })
    );
  }

  const transaction = await Transaction.create({
    amount,
    description,
    reference,
    date,
    category,
    type,
    user: req.user._id,
  });

  res.status(200).json({
    success: true,
    transaction,
    message: "transaction created successfully",
  });
};

exports.deleteTransaction = async (req, res, next) => {
  const transaction = await Transaction.findOneAndDelete({
    _id: req.params.id,
    user: req.user._id,
  });

  if (!transaction) {
    return next(new ErrorHandler("transaction not found", 404));
  }
  res.status(200).json({
    success: true,
    transaction,
    message: "transaction deleted successfully",
  });
};
