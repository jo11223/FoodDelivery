// models/aboutRestaurant.js

const mongoose = require("mongoose");

const aboutRestaurantSchema = new mongoose.Schema(
  {
    story: {
      type: String,
      required: true,
      trim: true,
    },
    mission: {
      type: String,
      trim: true,
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String, // store image URL or filename
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("AboutRestaurant", aboutRestaurantSchema);
