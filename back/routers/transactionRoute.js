const express = require("express");
const router = express.Router();

const {
  getAllTransaction,
  addTranscation,
  updateTransaction,
  deleteTransaction,
} = require("../controllers/transactionController");
const auth = require("../middlewares/auth");

router.use(auth);
router.route("/get").get(getAllTransaction);
router.route("/new").post(addTranscation);
router.route("/:id").put(updateTransaction).delete(deleteTransaction);

module.exports = router;
