const mongoose = require("mongoose");
const AssignmentSubmissionSchema = new mongoose.Schema(
  {
    assignmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Assignment",
      required: true,
    },
    classId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Class",
      required: true,
    },
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    fileUrl: { type: String, required: true },
    submittedAt: { type: Date, default: Date.now },

    score: { type: Number, default: null },
    feedback: { type: String, default: "" },
    status: {
      type: String,
      enum: ["pending", "graded"],
      default: "pending",
    },
  },
  { timestamps: true },
);
module.exports = mongoose.model(
  "AssignmentSubmission",
  AssignmentSubmissionSchema,
);
