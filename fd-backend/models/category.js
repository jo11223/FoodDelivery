const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Category title is required"],
    trim: true,
    unique: true,
  },
  icon: {
    type: String, // URL of the uploaded image
    required: [true, "Category icon is required"],
    validate: {
      validator: function (v) {
        return /^(https?:\/\/.*|\.\/.*|\.{2}\/.*)\.(jpeg|jpg|png|gif|webp|svg)$/.test(
          v
        );
      },
      message:
        "Please provide a valid image URL (jpeg, jpg, png, svg, gif, or webp)",
    },
  },
  menuItem: {
    type: [mongoose.Schema.Types.ObjectId], // Reference to the MenuItem model
    ref: "MenuItem",
    default: [],
  },
  //   status: {
  //     type: String,
  //     enum: ["active", "deleted"],
  //   },
  //   action: {
  //     type: String,
  //     enum: ["active", "inactive"],
  //   },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Middleware to update the `updatedAt` field automatically
categorySchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
