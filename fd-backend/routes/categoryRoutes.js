const express = require("express");
const router = express.Router();
const {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryController");

// Middleware for auth & admin check (you'll need to implement these)
const { protect } = require("../middleware/authMiddleware");

// Public routes
router.get("/", getAllCategories);
router.get("/:id", getCategoryById);

// // Admin-only routes
// router.post("/", protect, createCategory);
// router.put("/:id", protect, updateCategory);
// router.delete("/:id", protect, deleteCategory);

// Admin-only routes
router.post("/", createCategory);
router.put("/:id", updateCategory);
router.delete("/:id", deleteCategory);

module.exports = router;
