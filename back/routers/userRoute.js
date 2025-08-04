const express = require("express");
const router = express.Router();

const {
  loginUser,
  createUser,
  getUser,
} = require("../controllers/userController");
const auth = require("../middlewares/auth");

router.route("/").get(auth, getUser);
router.route("/login").post(loginUser);
router.route("/sign").post(createUser);

module.exports = router;
