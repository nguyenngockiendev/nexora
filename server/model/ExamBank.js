const mongoose = require("mongoose");
const { Schema } = mongoose;

const examQuestionSchema = new Schema({
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
});

const examBankSchema = new Schema(
  {
    courseId: {
      type: Schema.Types.ObjectId,
      ref: "Course",
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    questions: {
      type: [examQuestionSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("ExamBank", examBankSchema);
