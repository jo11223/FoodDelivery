// const Rate = require("../models/rate");

// // @desc    Add or update a rating
// // @route   POST /api/ratings
// // @access  Logged-in users
// export.updateRating = async (req, res) => {
//   try {
//     const { menuItem, rating } = req.body;

//     if (!menuItem || !rating) {
//       return res
//         .status(400)
//         .json({ message: "Menu item and rating are required" });
//     }

//     if (rating < 1 || rating > 5) {
//       return res
//         .status(400)
//         .json({ message: "Rating must be between 1 and 5" });
//     }

//     const getRating = await Rate.findOne({ user: req.user._id, menuItem });

//     let rateDoc;
//     if (getRating) {
//       // Update rating
//       getRating.rating = rating;
//       rateDoc = await getRating.save();
//     } else {
//       // Create new rating
//       rateDoc = await Rate.create({
//         user: req.user._id,
//         menuItem,
//         rating,
//       });
//     }

//     res
//       .status(201)
//       .json({ message: "Rating saved successfully", rating: rateDoc });
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// };

// // @desc    Get ratings for a specific menu item
// // @route   GET /api/ratings/menu-item/:id
// // @access  Public
// export const getRatingsForMenuItem = async (req, res) => {
//   try {
//     const ratings = await Rate.find({ menuItem: req.params.id }).populate(
//       "user",
//       "name"
//     );

//     if (!ratings.length) {
//       return res.json({ averageRating: 0, totalRatings: 0, ratings: [] });
//     }

//     const averageRating =
//       ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length;

//     res.json({
//       averageRating: averageRating.toFixed(1),
//       totalRatings: ratings.length,
//       ratings,
//     });
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// };

// // @desc    Get logged-in user's ratings
// // @route   GET /api/ratings/my
// // @access  Logged-in users
// export const getMyRatings = async (req, res) => {
//   try {
//     const myRatings = await Rate.find({ user: req.user._id }).populate(
//       "menuItem",
//       "name price"
//     );

//     res.json(myRatings);
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// };

// // @desc    Delete a rating
// // @route   DELETE /api/ratings/:id
// // @access  Logged-in users (only their own rating)
// export const deleteRating = async (req, res) => {
//   try {
//     const rating = await Rate.findById(req.params.id);

//     if (!rating) {
//       return res.status(404).json({ message: "Rating not found" });
//     }

//     if (rating.user.toString() !== req.user._id.toString()) {
//       return res
//         .status(403)
//         .json({ message: "Not authorized to delete this rating" });
//     }

//     await rating.deleteOne();
//     res.json({ message: "Rating deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// };
const rate = require("../models/rate");

// @desc    Add or update a rating
// @route   POST /api/ratings
// @access  Logged-in users
const updateRating = async (req, res) => {
  try {
    const { menuItem, rating } = req.body;

    if (!menuItem || !rating) {
      return res
        .status(400)
        .json({ message: "Menu item and rating are required" });
    }

    if (rating < 1 || rating > 5) {
      return res
        .status(400)
        .json({ message: "Rating must be between 1 and 5" });
    }

    const getRating = await Rate.findOne({ user: req.user._id, menuItem });

    let rateDoc;
    if (getRating) {
      // Update rating
      getRating.rating = rating;
      rateDoc = await getRating.save();
    } else {
      // Create new rating
      rateDoc = await Rate.create({
        user: req.user._id,
        menuItem,
        rating,
      });
    }

    res
      .status(201)
      .json({ message: "Rating saved successfully", rating: rateDoc });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Get ratings for a specific menu item
// @route   GET /api/ratings/menu-item/:id
// @access  Public
const getRatingsForMenuItem = async (req, res) => {
  try {
    const ratings = await Rate.find({ menuItem: req.params.id }).populate(
      "user",
      "name"
    );

    if (!ratings.length) {
      return res.json({ averageRating: 0, totalRatings: 0, ratings: [] });
    }

    const averageRating =
      ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length;

    res.json({
      averageRating: averageRating.toFixed(1),
      totalRatings: ratings.length,
      ratings,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Get logged-in user's ratings
// @route   GET /api/ratings/my
// @access  Logged-in users
const getMyRatings = async (req, res) => {
  try {
    const myRatings = await Rate.find({ user: req.user._id }).populate(
      "menuItem",
      "name price"
    );

    res.json(myRatings);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Delete a rating
// @route   DELETE /api/ratings/:id
// @access  Logged-in users (only their own rating)
const deleteRating = async (req, res) => {
  try {
    const rating = await Rate.findById(req.params.id);

    if (!rating) {
      return res.status(404).json({ message: "Rating not found" });
    }

    if (rating.user.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "Not authorized to delete this rating" });
    }

    await rating.deleteOne();
    res.json({ message: "Rating deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  updateRating,
  getRatingsForMenuItem,
  getMyRatings,
  deleteRating,
};
