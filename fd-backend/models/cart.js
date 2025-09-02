// models/cart.js
const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema(
  {
    menuItem: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MenuItem",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    note: {
      type: String, // special instructions like "extra spicy"
      trim: true,
    },
  },
  { _id: false }
);

const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // the customer
      required: true,
      unique: true, // 1 cart per user
    },
    items: [cartItemSchema],
    totalPrice: {
      type: Number,
      default: 0,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// Middleware to calculate total price automatically
cartSchema.pre("save", async function (next) {
  if (!this.isModified("items")) return next();

  let total = 0;
  for (let item of this.items) {
    const menuItem = await mongoose.model("MenuItem").findById(item.menuItem);
    if (menuItem) {
      total += menuItem.price * item.quantity;
    }
  }
  this.totalPrice = total;
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model("Cart", cartSchema);
