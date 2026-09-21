const mongoose = require("mongoose");

const OtpSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      trim: true,
    },
    otp: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["register", "forgot_password"],
      default: "register",
    },
    createdAt: {
      type: Date,
      default: Date.now,
      expires: 300, 
    },
  },
  { timestamps: false }
);

module.exports = mongoose.model("Otp", OtpSchema);