const bcrypt = require("bcryptjs");
const User = require("../models/User");
const generateToken = require("../utils/generateToken");
const sendEmail = require("../utils/email");
const crypto = require("crypto");

// Register
exports.register = async (req, res) => {
  try {
    const { name, phone, email, password, passwordConfirm, role } = req.body;

    if (!name || !phone || !password || !passwordConfirm) {
      return res
        .status(400)
        .json({ message: "All required fields must be filled" });
    }

    if (password !== passwordConfirm) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const existingUser = await User.findOne({ phone });
    if (existingUser) {
      return res
        .status(409)
        .json({ message: "User already exists with this phone" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      phone,
      email,
      password: hashedPassword,
      role: role || "customer",
    });

    await user.save();

    res.status(201).json({
      message: "User registered successfully",
      token: generateToken(user._id, user.role),
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

// Login
exports.login = async (req, res) => {
  try {
    const { phone, password } = req.body;

    if (!phone || !password) {
      return res
        .status(400)
        .json({ message: "Phone and password are required" });
    }

    const user = await User.findOne({ phone }).select("+password");
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    res.json({
      message: "Login successful",
      token: generateToken(user._id, user.role),
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

exports.forgotPassword = async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.body.email,
    });

    if (!user) {
      return res.status(404).json({
        status: "fail",
        message: "No user found with this email!",
      });
    }

    // Generate password reset code
    const resetCode = User.createPasswordResetCode();
    await user.save({
      validateBeforeSave: false,
    });

    // Send email with reset code
    const message = `Your password reset code is: ${resetCode}. This code will expire in 10 minutes.`;

    await sendEmail({
      email: user.email,
      subject: "Password Reset Code",
      message,
    });

    res.status(200).json({
      status: "success",
      message: "Reset code sent to email!",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: "fail",
      message: "Error processing password reset request!",
    });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const hashedCode = crypto
      .createHash("sha256")
      .update(req.body.passwordResetCode)
      .digest("hex");

    const user = await User.findOne({
      passwordResetCode: hashedCode,
      passwordResetCodeExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        status: "fail",
        message: "Invalid or expired reset code!",
      });
    }

    // Update password
    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;
    user.passwordResetCode = undefined;
    user.passwordResetCodeExpires = undefined;
    await user.save();

    res.status(200).json({
      status: "success",
      message: "Password reset successfully!",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: "fail",
      message: "Error resetting password!",
    });
  }
};
