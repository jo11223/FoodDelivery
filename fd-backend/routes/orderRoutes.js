const express = require("express");
const router = express.Router();
const {
  createOrder,
  getMyOrders,
  getOrderById,
  getAllOrders,
  updateOrderStatus,
  deleteOrder,
} = require("../controllers/orderController");
const { protect } = require("../middleware/authMiddleware");

// Public (guest) + Customer
router.post("/", createOrder);

// Customer orders
router.get("/my", getMyOrders);

// Admin/Owner
router.get("/", getAllOrders);

// Get single order
router.get("/:id", getOrderById);

// Update status
router.put("/:id/status", updateOrderStatus);

// Delete
router.delete("/:id", deleteOrder);

module.exports = router;
