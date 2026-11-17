const mongoose = require("mongoose");

const ProcessLessonSchema = new mongoose.Schema(
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

    lessonId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lesson",
      required: true,
    },

    // Người dùng đang xem đến giây nào
    lastPosition: {
      type: Number,
      default: 0,
    },

    // % hoàn thành
    percent: {
      type: Number,
      default: 0,
    },

    // Đã hoàn thành bài học chưa
    completed: {
      type: Boolean,
      default: false,
    },

    completedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

ProcessLessonSchema.index(
  {
    userId: 1,
    lessonId: 1,
  },
  {
    unique: true,
  },
);

module.exports = mongoose.model("ProcessLesson", ProcessLessonSchema);
