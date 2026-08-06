const mongoose = require("mongoose");

const ratingsSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },

    rating: { type: Number},
    instructorRating: { type: Number},
    comment: { type: String },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Rating", ratingsSchema);
