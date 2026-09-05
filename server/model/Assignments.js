const mongoose = require("mongoose");
const AssignmentSchema = new mongoose.Schema(
  {
    classId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Class",
      required: true,
    },
    instructorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: { type: String, required: true },
    description: { type: String, default: "" },
    fileUrl: { type: String, required: true },
    deadline: { type: Date, required: true },
  },
  { timestamps: true },
);
module.exports = mongoose.model("Assignment", AssignmentSchema);
