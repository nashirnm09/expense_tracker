const express = require("express");
const router = express.Router();

const {
  getAllTransaction,
  addTranscation,
  updateTransaction,
  deleteTransaction,
} = require("../controllers/transactionController");

router.route("/:id/getTrans").get(getAllTransaction);
router.route("/:id/addTrans").post(addTranscation);
router.route("/:id/updateTrans").post(updateTransaction);
router.route("/:id/deleteTrans").post(deleteTransaction);

module.exports = router;
