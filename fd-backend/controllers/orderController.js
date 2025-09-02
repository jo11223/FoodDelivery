const Order = require("../models/Order");
const Cart = require("../models/Cart");

// @desc   Create a new order
// @route  POST /api/orders
// @access Public (guest) + Customer
exports.createOrder = async (req, res) => {
  try {
    const { customerInfo, items, totalPrice, paymentMethod } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "No items in order" });
    }

    if (
      !customerInfo ||
      !customerInfo.name ||
      !customerInfo.phone ||
      !customerInfo.address
    ) {
      return res.status(400).json({ message: "Customer info is required" });
    }

    const order = new Order({
      customer: req.user ? req.user._id : null, // null if guest
      customerInfo,
      items,
      totalPrice,
      paymentMethod,
    });

    await order.save();

    // If user is logged in and has a cart, clear it
    if (req.user) {
      await Cart.findOneAndUpdate(
        { user: req.user._id },
        { items: [], totalPrice: 0 }
      );
    }

    res.status(201).json({ message: "Order placed successfully", order });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc   Get logged-in customer's orders
// @route  GET /api/orders/my
// @access Customer
exports.getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ customer: req.user._id }).sort({
      createdAt: -1,
    });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc   Get single order by ID
// @route  GET /api/orders/:id
// @access Customer (their own) + Admin/Owner
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      "items.menuItem"
    );
    if (!order) return res.status(404).json({ message: "Order not found" });

    // Restrict customers to their own orders
    if (
      req.user.role === "customer" &&
      order.customer.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({ message: "Access denied" });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc   Get all orders
// @route  GET /api/orders
// @access Admin/Owner
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("customer", "name phone")
      .populate("items.menuItem");
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc   Update order status
// @route  PUT /api/orders/:id/status
// @access Admin/Owner/Rider
exports.updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = [
      "pending",
      "confirmed",
      "preparing",
      "ready",
      "out_for_delivery",
      "delivered",
      "cancelled",
    ];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });

    order.orderStatus = status;
    if (status === "delivered") {
      order.deliveredAt = Date.now();
    }

    await order.save();
    res.json({ message: "Order status updated", order });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc   Delete order
// @route  DELETE /api/orders/:id
// @access Admin/Owner
exports.deleteOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });

    await order.deleteOne();
    res.json({ message: "Order deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
