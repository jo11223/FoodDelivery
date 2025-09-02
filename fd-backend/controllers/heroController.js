const HeroSection = require("../models/herosection.js");

// @desc    Create a new hero section
// @route   POST /api/herosections
// @access  Admin only
exports.createHeroSection = async (req, res) => {
  try {
    const { restaurant, title, description, logo } = req.body;

    if (!restaurant || !title || !logo) {
      return res
        .status(400)
        .json({ message: "Restaurant, title, and logo are required" });
    }

    const heroSection = new HeroSection({
      restaurant,
      title,
      description,
      logo,
    });
    await heroSection.save();

    res
      .status(201)
      .json({ message: "Hero section created successfully", heroSection });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Get all hero sections
// @route   GET /api/herosections
// @access  Public
exports.getAllHeroSections = async (req, res) => {
  try {
    const heroSections = await HeroSection.find().sort({ createdAt: -1 });
    res.json(heroSections);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Get hero section by ID
// @route   GET /api/herosections/:id
// @access  Public
exports.getHeroSectionById = async (req, res) => {
  try {
    const heroSection = await HeroSection.findById(req.params.id).populate(
      "restaurant"
    );
    if (!heroSection) {
      return res.status(404).json({ message: "Hero section not found" });
    }
    res.json(heroSection);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Update hero section
// @route   PUT /api/herosections/:id
// @access  Admin only
exports.updateHeroSection = async (req, res) => {
  try {
    const { title, description, logo } = req.body;
    const heroSection = await HeroSection.findById(req.params.id);

    if (!heroSection) {
      return res.status(404).json({ message: "Hero section not found" });
    }

    if (title) heroSection.title = title;
    if (description) heroSection.description = description;
    if (logo) heroSection.logo = logo;

    await heroSection.save();

    res.json({ message: "Hero section updated successfully", heroSection });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Delete hero section
// @route   DELETE /api/herosections/:id
// @access  Admin only
exports.deleteHeroSection = async (req, res) => {
  try {
    const heroSection = await HeroSection.findByIdAndDelete(req.params.id);

    if (!heroSection) {
      return res.status(404).json({ message: "Hero section not found" });
    }

    res.json({ message: "Hero section deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
