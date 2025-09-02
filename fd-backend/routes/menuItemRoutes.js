const express = require("express");
const router = express.Router();
const {
  createMenuItem,
  getAllMenuItems,
  getMenuItemById,
  updateMenuItem,
  deleteMenuItem,
  toggleAvailability,
} = require("../controllers/menuItemController");
const { protect } = require("../middleware/authMiddleware");

router.get("/", getAllMenuItems);
router.get("/:id", getMenuItemById);

router.post("/", createMenuItem);
router.put("/:id", updateMenuItem);
router.delete("/:id", deleteMenuItem);
router.patch("/:id/availability", toggleAvailability);

module.exports = router;
