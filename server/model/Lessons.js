const mongoose = require("mongoose");

const lessonSchema = new mongoose.Schema(
  {
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },

    title: { type: String, required: true },

    videoUrl: { type: String, required: true },

    duration: { type: Number, required: true },

    order: { type: Number, required: true },

    isPreview: { type: Boolean, default: false, required: true },

    content: { type: String, default: "" },
    resources: {
      type: [
        {
          type: { type: String, required: true },
          title: { type: String, required: true },
          url: { type: String, required: true, default: "" },
        },
      ],
      default: [],
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Lesson", lessonSchema);
