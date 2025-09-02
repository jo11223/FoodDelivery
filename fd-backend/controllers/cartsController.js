const Cart = require("../models/Cart");
const MenuItem = require("../models/MenuItem");

// @desc   Get logged-in user's cart
// @route  GET /api/cart
// @access Customer
exports.getCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user._id }).populate(
      "items.menuItem"
    );

    if (!cart) {
      cart = new Cart({ user: req.user._id, items: [] });
      await cart.save();
    }

    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc   Add item to cart or update quantity if exists
// @route  POST /api/cart
// @access Customer
exports.addItemToCart = async (req, res) => {
  try {
    const { menuItemId, quantity, note } = req.body;

    const menuItem = await MenuItem.findById(menuItemId);
    if (!menuItem) {
      return res.status(404).json({ message: "Menu item not found" });
    }

    let cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      cart = new Cart({ user: req.user._id, items: [] });
    }

    // Check if item already in cart
    const existingItemIndex = cart.items.findIndex(
      (item) => item.menuItem.toString() === menuItemId
    );

    if (existingItemIndex > -1) {
      cart.items[existingItemIndex].quantity += quantity;
      if (note) cart.items[existingItemIndex].note = note;
    } else {
      cart.items.push({ menuItem: menuItemId, quantity, note });
    }

    await cart.save();
    cart = await cart.populate("items.menuItem");

    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc   Update quantity of an item in cart
// @route  PUT /api/cart/item/:menuItemId
// @access Customer
exports.updateItemQuantity = async (req, res) => {
  try {
    const { quantity } = req.body;

    let cart = await Cart.findOne({ user: req.user._id });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const item = cart.items.find(
      (item) => item.menuItem.toString() === req.params.menuItemId
    );
    if (!item)
      return res.status(404).json({ message: "Item not found in cart" });

    item.quantity = quantity;
    await cart.save();
    cart = await cart.populate("items.menuItem");

    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc   Remove item from cart
// @route  DELETE /api/cart/item/:menuItemId
// @access Customer
exports.removeItemFromCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user._id });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = cart.items.filter(
      (item) => item.menuItem.toString() !== req.params.menuItemId
    );

    await cart.save();
    cart = await cart.populate("items.menuItem");

    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc   Clear cart
// @route  DELETE /api/cart
// @access Customer
exports.clearCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user._id });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = [];
    await cart.save();

    res.json({ message: "Cart cleared" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
