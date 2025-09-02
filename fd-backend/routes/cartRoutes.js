const express = require("express");
const router = express.Router();
const {
  getCart,
  addItemToCart,
  updateItemQuantity,
  removeItemFromCart,
  clearCart,
} = require("../controllers/cartsController");
const { protect, authorize } = require("../middleware/authMiddleware");

// All cart routes require login
router.get("/", getCart);
router.post("/", addItemToCart);
router.put("/item/:menuItemId", updateItemQuantity);
router.delete("/item/:menuItemId", removeItemFromCart);
router.delete("/", clearCart);

module.exports = router;
