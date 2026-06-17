const mongoose = require("mongoose");
const { Schema } = mongoose;

const questionSchema = new Schema({
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
    type: Number,
    required: true,
  },

  explanation: {
    type: String,
    default: "",
  },


});

const quizSchema = new Schema(
  {
    courseId: {
      type: Schema.Types.ObjectId,
      ref: "Course",
      required: true,
      index: true,
    },

    lessonId: {
      type: Schema.Types.ObjectId,
      ref: "Lesson",
      required: true,
      unique: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },
    duration: {
      type: Number,
      required: true,
      
    },

    description: {
      type: String,
      default: "",
    },

    questions: {
      type: [questionSchema],
      default: [],
    },


    passScore: {
      type: Number,
      default: 70,
    },

    status: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Quiz", quizSchema);
