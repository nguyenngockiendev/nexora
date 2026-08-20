const mongoose = require("mongoose");
const notificationSchema = new mongoose.Schema(
  {
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    title: { type: String, required: true },
    message: { type: String, required: true },

    type: {
      type: String,
      enum: ["help_request", "help_reply", "admin_note", "broadcast"],
      default: "help_request",
    },

    targetRole: {
      type: String,
      enum: ["all", "student", "instructor"],
      default: "all",
    },

    isRead: { type: Boolean, default: false },
  },
  { timestamps: true },
);
module.exports = mongoose.model("Notification", notificationSchema);
