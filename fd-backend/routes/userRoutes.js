const express = require("express");
const router = express.Router();
const {
  getUser,
  getAllUsers,
  updateUser,
  deleteUser,
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

// Get all users (Admin/Owner)
router.get("/", getAllUsers);

// Get one user
router.get("/:id", getUser);

// Update user
router.put("/:id", updateUser);

// Delete user
router.delete("/:id", deleteUser);

module.exports = router;
