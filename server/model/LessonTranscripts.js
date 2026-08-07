const mongoose = require("mongoose");

const lessonTranscriptSchema = new mongoose.Schema(
  {
    lessonId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lesson",
      required: true,
    },

    chunkIndex: {
      type: Number,
      required: true,
    },

    startTime: {
      type: Number,
      required: true,
    },

    endTime: {
      type: Number,
      required: true,
    },

    text: {
      type: String,
    },

    status: {
      type: String,
      enum: ["PROCESSING", "DONE", "FAILED"],
      default: "PROCESSING",
    },
  },
  {
    timestamps: true,
  },
);

lessonTranscriptSchema.index({
  lessonId: 1,
  chunkIndex: 1,
});

module.exports = mongoose.model("LessonTranscript", lessonTranscriptSchema);
