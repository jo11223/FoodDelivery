const User = require("../models/User");

// @desc   Get a single user by ID
// @route  GET /api/users/:id
// @access Admin / Owner (or self)
exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Optional: restrict if normal customer tries to view another user's data
    if (
      req.user.role === "customer" &&
      req.user._id.toString() !== user._id.toString()
    ) {
      return res.status(403).json({ message: "Access denied" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc   Get all users
// @route  GET /api/users
// @access Admin / Owner
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc   Update a user
// @route  PUT /api/users/:id
// @access Admin / Owner (or self)
exports.updateUser = async (req, res) => {
  try {
    const { name, phone, email, role } = req.body;

    let user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Restrict normal customers from changing others' accounts
    if (
      req.user.role === "customer" &&
      req.user._id.toString() !== user._id.toString()
    ) {
      return res.status(403).json({ message: "Access denied" });
    }

    // Update allowed fields
    if (name) user.name = name;
    if (phone) user.phone = phone;
    if (email) user.email = email;

    // Only admin/owner can change role
    if (role && (req.user.role === "owner" || req.user.role === "admin")) {
      user.role = role;
    }

    await user.save();

    res.json({
      message: "User updated successfully",
      user: {
        _id: user._id,
        name: user.name,
        phone: user.phone,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc   Delete a user
// @route  DELETE /api/users/:id
// @access Admin / Owner (or self)
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Restrict normal customers from deleting others
    if (
      req.user.role === "customer" &&
      req.user._id.toString() !== user._id.toString()
    ) {
      return res.status(403).json({ message: "Access denied" });
    }

    await user.deleteOne();
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
