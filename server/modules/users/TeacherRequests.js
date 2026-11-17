const mongoose = require("mongoose");
const { Schema } = mongoose;

const TeacherRequestSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    specialty: {
      type: String,
    },
    opinion: {
      type: String,
    },
    proofImage: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true },
);
module.exports = mongoose.model("TeacherRequest", TeacherRequestSchema);
