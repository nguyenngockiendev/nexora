const mongoose = require("mongoose");
const { Schema } = mongoose;

const focusQuestionSchema = new Schema({
  question: {
    type: String,
    required: true,
    trim: true,
  },
  options: {
    type: [String],
    required: true,
  },
  correctAnswer: {
    type: [Number],
    required: true,
  },
  explanation: {
    type: String,
    default: "",
  },
  repeatCount: {
    type: Number,
    default: 2,
  },
});

const focusExamSchema = new Schema(
  {
    courseId: {
      type: Schema.Types.ObjectId,
      ref: "Course",
      required: true,
      unique: true,
      index: true,
    },
    totalExamsAnalyzed: {
      type: Number,
      default: 0,
    },
    questions: {
      type: [focusQuestionSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("FocusExam", focusExamSchema);
