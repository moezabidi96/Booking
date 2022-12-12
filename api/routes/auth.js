const express = require("express");
const { register, logInUser } = require("../controllers/auth.controller");

const router = express.Router();

router.post("/register", register);
router.post("/login", logInUser);

module.exports = router;
