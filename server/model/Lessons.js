const mongoose = require("mongoose");

const lessonSchema = new mongoose.Schema({
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

  createdAt: { type: Date, default: Date.now() },
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
  quiz: {
    type: [
      {
        question: { type: String, required: true },
        options: { type: [String], required: true },
        correctAnswer: { type: String, required: true },
        explanation: { type: String },
      },
    ],
    default: [],
  },
});

module.exports = mongoose.model("Lesson", lessonSchema);
