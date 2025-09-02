const mongoose = require("mongoose");

const rateSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true, // only logged-in users can rate
    },
    menuItem: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MenuItem",
      required: true, // rating is linked to a specific menu item
    },
    rating: {
      type: Number,
      required: true,
      min: 1, // minimum rating value
      max: 5, // maximum rating value
    },
  },
  { timestamps: true }
);

// Ensure a user can rate a menuItem only once
rateSchema.index({ user: 1, menuItem: 1 }, { unique: true });

module.exports = mongoose.model("Rate", rateSchema);
