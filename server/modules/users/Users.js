const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    role: {
      type: String,
      enum: ["admin", "student", "instructor"],
      default: "student",
    },
    avatar: { type: String },
    status: { type: String, enum: ["active", "inactive"] },
    phone: { type: String },
    isVerified: {
      type: Boolean,
      default: false,
    },
    googleId: {
      type: String,
      default: null,
    },
  },

  {
    timestamps: true,
  },
);

module.exports = mongoose.model("User", userSchema);
