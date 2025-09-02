const express = require("express");
const {
  createHeroSection,
  getAllHeroSections,
  getHeroSectionById,
  updateHeroSection,
  deleteHeroSection,
} = require("../controllers/heroController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Public routes
router.get("/", getAllHeroSections);
router.get("/:id", getHeroSectionById);

// Admin-only routes
router.post("/", createHeroSection);
router.put("/:id", updateHeroSection);
router.delete("/:id", deleteHeroSection);

module.exports = router;
