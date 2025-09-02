const AboutRestaurant = require("../models/aboutRestaurant.js");

// @desc    Create about info
// @route   POST /api/about
// @access  Admin only
exports.createAbout = async (req, res) => {
  try {
    const { story, mission, address, image } = req.body;

    if (!story || !address || !image) {
      return res
        .status(400)
        .json({ message: "Story, address, and image are required" });
    }

    // Optional: enforce single about doc by checking if exists
    const existing = await AboutRestaurant.findOne();
    if (existing) {
      return res
        .status(400)
        .json({ message: "About info already exists, please update instead." });
    }

    const about = new AboutRestaurant({ story, mission, address, image });
    await about.save();

    res.status(201).json({ message: "About info created", about });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Get about info (there should be only one)
// @route   GET /api/about
// @access  Public
exports.getAbout = async (req, res) => {
  try {
    const about = await AboutRestaurant.findOne();
    if (!about) {
      return res.status(404).json({ message: "About info not found" });
    }
    res.json(about);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Update about info
// @route   PUT /api/about/:id
// @access  Admin only
exports.updateAbout = async (req, res) => {
  try {
    const { story, mission, address, image } = req.body;
    const about = await AboutRestaurant.findById(req.params.id);

    if (!about) {
      return res.status(404).json({ message: "About info not found" });
    }

    if (story) about.story = story;
    if (mission) about.mission = mission;
    if (address) about.address = address;
    if (image) about.image = image;

    await about.save();

    res.json({ message: "About info updated", about });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Delete about info
// @route   DELETE /api/about/:id
// @access  Admin only
exports.deleteAbout = async (req, res) => {
  try {
    const about = await AboutRestaurant.findByIdAndDelete(req.params.id);
    if (!about) {
      return res.status(404).json({ message: "About info not found" });
    }
    res.json({ message: "About info deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
