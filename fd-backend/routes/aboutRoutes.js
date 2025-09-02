const express = require("express");
const {
  createAbout,
  getAbout,
  updateAbout,
  deleteAbout,
} = require("../controllers/aboutController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Public route
router.get("/", getAbout);

// // Admin-only routes
// router.post("/", protect, createAbout);
// router.put("/:id", protect, updateAbout);
// router.delete("/:id", protect, deleteAbout);
// Admin-only routes
router.post("/", createAbout);
router.put("/:id", updateAbout);
router.delete("/:id", deleteAbout);

module.exports = router;
