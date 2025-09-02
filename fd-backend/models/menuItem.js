const mongoose = require("mongoose");

const menuItemSchema = new mongoose.Schema(
  {
    name: String,
    description: String,
    price: Number,
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      default: null,
    },
    imageUrl: String,
    available: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("MenuItem", menuItemSchema);
