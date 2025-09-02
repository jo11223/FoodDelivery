const express = require("express");
const router = express.Router();

const {
  register,
  login,
  forgotPassword,
  resetPassword,
} = require("../controllers/authController");

// Register new user
router.post("/register", register);

// Login user
router.post("/login", login);

// Forgot password
router.post("/forgot-password", forgotPassword);

// Reset password
router.post("/reset-password", resetPassword);

module.exports = router;
