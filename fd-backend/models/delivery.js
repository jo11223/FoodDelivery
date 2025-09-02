const mongoose = require("mongoose");

const deliverySchema = new mongoose.Schema(
  {
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true,
      unique: true,
    },
    rider: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    deliveryStatus: {
      type: String,
      enum: ["assigned", "picked_up", "on_the_way", "delivered"],
      default: "assigned",
    },
    pickupTime: Date,
    deliveryTime: Date,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Delivery", deliverySchema);
