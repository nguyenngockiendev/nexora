const mongoose = require("mongoose");

const classSchema = new mongoose.Schema({
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  instructorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  className: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  maxStudents: { type: Number, required: true, default: 30, min: 1 },
  currentStudents: { type: Number, default: 0 },
  registerDeadline: { type: Date, required: true },
  startDate: { type: Date, required: true, default: Date.now },
  endDate: { type: Date, required: true },
  meetingLink: { type: String, required: true },
  schedule: {
    day: {
      type: String,
      enum: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      required: true,
    },
    startTime: { type: Number, required: true },
    endTime: { type: Number, required: true },
  },

  status: {
    type: String,
    enum: ["open", "ongoing", "closes"],
    default: "open",
  },
  price: {
    type: Number,
    required: true,
  },

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});
module.exports = mongoose.model("Class", classSchema);
