const mongoose = require("mongoose");

const QuizAttemptSchema = new mongoose.Schema(
  {
    quizId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Quiz",
      required: true,
    },

    lessonId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lesson",
      required: true,
    },

    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },

    classId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Class",
     
    },

    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    answers: [
      {
        questionId: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
        },

        selectedAnswer: {
          type: Number,
          required: true,
        },

        correctAnswer: {
          type: Number,
          required: true,
        },

        isCorrect: {
          type: Boolean,
          required: true,
        },
      },
    ],

    score: {
      type: Number,
      default: 0,
    },

    totalQuestions: {
      type: Number,
      required: true,
    },

    correctAnswers: {
      type: Number,
      default: 0,
    },

    startedAt: {
      type: Date,
      default: Date.now,
    },

    submittedAt: {
      type: Date,
      default: Date.now,
    },

    timeTaken: {
      type: Number,
      default: 0,
    },

    status: {
      type: String,
      enum: ["submitted"],
      default: "submitted",
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("QuizAttempt", QuizAttemptSchema);
