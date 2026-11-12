const mongoose = require("mongoose");
const normalizedChunkSchema = new mongoose.Schema({
  index: {
    type: Number,
    required: true,
    min: 0,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  content: {
    type: String,
    required: true,
    trim: true,
  },
  sources: {
    type: [
      {
        chunkIndex: {
          type: Number,
          required: true,
          min: 0,
        },
      },
    ],
    default: [],
  },
});

const lessonNormalizedSchema = new mongoose.Schema(
  {
    lessonId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lesson",
      required: true,
    },

    status: {
      type: String,
      enum: ["PROCESSING", "VALIDATING", "READY", "NEEDS_REVIEW", "FAILED"],
      default: "PROCESSING",
      required: true,
    },

    normalizedChunks: {
      type: [normalizedChunkSchema],
      default: [],
    },
  },
  { timestamps: true },
);
lessonNormalizedSchema.index({ lessonId: 1 }, { unique: true });
module.exports = mongoose.model(
  "LessonNormalizedContent",
  lessonNormalizedSchema,
);
