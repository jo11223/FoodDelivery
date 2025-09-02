const Category = require("../models/category");

// @desc    Create a new category
// @route   POST /api/categories
// @access  Admin only
exports.createCategory = async (req, res) => {
  try {
    const { title, icon } = req.body;

    if (!title || !icon) {
      return res.status(400).json({ message: "Title and icon are required" });
    }

    // Check if title already exists
    const existingCategory = await Category.findOne({ title });
    if (existingCategory) {
      return res.status(409).json({ message: "Category title must be unique" });
    }

    const category = new Category({ title, icon });
    await category.save();

    res
      .status(201)
      .json({ message: "Category created successfully", category });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Get all categories
// @route   GET /api/categories
// @access  Public
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 });
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Get category by ID
// @route   GET /api/categories/:id
// @access  Public
exports.getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id).populate(
      "menuItem"
    );
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.json(category);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Update a category
// @route   PUT /api/categories/:id
// @access  Admin only
exports.updateCategory = async (req, res) => {
  try {
    const { title, icon } = req.body;
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    if (title) category.title = title;
    if (icon) category.icon = icon;

    await category.save();

    res.json({ message: "Category updated successfully", category });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Delete a category
// @route   DELETE /api/categories/:id
// @access  Admin only
exports.deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
