const mongoose = require("mongoose");
const { Schema } = mongoose;

const sourceSchema = new Schema(
  {
    examId: {
      type: Schema.Types.ObjectId,
      ref: "ExamBank",
      required: true,
    },
    title: {
      type: String,
      default: "",
      trim: true,
    },
  },
  { _id: false },
);

const dedupQuestionSchema = new Schema({
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
  sources: {
    type: [sourceSchema],
    default: [],
  },
});

const dedupExamSchema = new Schema(
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
    totalQuestions: {
      type: Number,
      default: 0,
    },
    questions: {
      type: [dedupQuestionSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("DedupExam", dedupExamSchema);
