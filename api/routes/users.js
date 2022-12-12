const express = require("express");
const {
  updateUser,
  deleteUser,
  getUserById,
  getAllUsers,
} = require("../controllers/user.controller");
const checkAuth = require("../middleware/check-auth");

const router = express.Router();

router.use(checkAuth.verifyAuth);

router.get("/:id", getUserById);
router.get("/", getAllUsers);

router.use(checkAuth.verifyAdmin);

router.put("/:id", updateUser);

router.delete("/:id", deleteUser);

module.exports = router;
