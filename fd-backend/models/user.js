const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      unique: true,
      sparse: true, // allows guest users with no email
    },
    password: {
      type: String,
      minlength: 6,
      required: function () {
        return this.role !== "guest"; // guests don't need password
      },
      select: false, // don't return password in queries
    },
    passwordConfirm: {
      type: String,
      required: function () {
        return this.role !== "guest";
      },
      validate: {
        // This only works on CREATE and SAVE
        validator: function (el) {
          return el === this.password;
        },
        message: "Passwords do not match!",
      },
      select: false, // not stored for retrieval
    },
    role: {
      type: String,
      enum: ["customer", "owner", "rider", "guest"],
      default: "customer",
    },
  },
  {
    timestamps: true,
  }
);

// 🔒 Encrypt password before saving
userSchema.pre("save", async function (next) {
  // Only run if password was modified
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);

  // Remove passwordConfirm field (it shouldn't be stored)
  this.passwordConfirm = undefined;
  next();
});

// 🔐 Method to compare passwords
userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.createPasswordResetCode = function () {
  const resetCode = Math.floor(100000 + Math.random() * 900000).toString();

  this.passwordResetCode = crypto
    .createHash("sha256")
    .update(resetCode)
    .digest("hex");

  this.passwordResetCodeExpires = Date.now() + 10 * 60 * 1000; // Expires in 10 min

  return resetCode; // Send plain code to user
};
module.exports = mongoose.model("User", userSchema);
