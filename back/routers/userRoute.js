const express = require("express");
const router = express.Router();

const {
  loginUser,
  createUser,
  getUser,
} = require("../controllers/userController");

router.route("/login").post(loginUser);
router.route("/sign").post(createUser);
router.route("/get").get(getUser);

module.exports = router;
