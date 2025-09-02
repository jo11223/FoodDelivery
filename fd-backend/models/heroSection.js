const mongoose = require("mongoose");

const heroSectionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100, // Restaurant name or catchy title
    },
    description: {
      type: String,
      trim: true,
      maxlength: 300, // Short intro or slogan
    },
    logo: {
      type: String, // URL or path to logo image
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("HeroSection", heroSectionSchema);
