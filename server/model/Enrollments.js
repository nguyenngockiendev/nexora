const mongoose = require("mongoose");

const enrollmentsSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },

  classId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Class",
    
  },

  type: { type: String, enum: ["free", "recorded", "live"], required: true },

  status: {
    type: String,
    enum: ["active", "completed", "cancelled"],
    default: "active",
  },

  enrolledAt: { type: Date, default: Date.now },

  completedAt: { type: Date, default: null },

  createdAt: { type: Date, default: Date.now },

  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Enrollment", enrollmentsSchema);
