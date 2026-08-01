const mongoose = require("mongoose");

const classMessageSchema = new mongoose.Schema(
  {
    classId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Class",
      required: true,
    },

    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    content: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

classMessageSchema.index({ classId: 1, createdAt: -1 });

module.exports = mongoose.model("ClassMessages", classMessageSchema);
