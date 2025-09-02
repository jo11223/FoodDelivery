// module.exports = mongoose.model("Order", orderSchema);
const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // registered customer
      default: null, // null for guest orders
    },
    customerInfo: {
      // always store delivery details here (guest or registered)
      name: { type: String, required: true },
      phone: { type: String, required: true },
      address: { type: String, required: true },
      coordinates: {
        lat: { type: Number, required: true },
        lng: { type: Number, required: true },
      },
    },
    items: [
      {
        menuItem: { type: mongoose.Schema.Types.ObjectId, ref: "MenuItem" },
        quantity: { type: Number, required: true },
        priceAtOrderTime: { type: Number, required: true },
      },
    ],
    totalPrice: { type: Number, required: true },

    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed", "refunded"],
      default: "pending",
    },
    paymentMethod: {
      type: String,
      enum: ["cash", "online"],
      default: "cash",
    },
    transactionId: {
      type: String, // for online payments
    },
    paidAt: { type: Date },

    orderStatus: {
      type: String,
      enum: [
        "pending", // just placed
        "confirmed", // accepted by restaurant
        "preparing", // being cooked
        "ready", // ready for pickup/delivery
        "out_for_delivery", // with rider
        "delivered", // completed
        "cancelled", // cancelled by customer/admin
      ],
      default: "pending",
    },
    // cancellationReason: { type: String },
    deliveredAt: { type: Date },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", orderSchema);
