const mongoose = require("mongoose");

const aiConversationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    messages: [
      {
        turnId: mongoose.Schema.Types.ObjectId,
        role: {
          type: String,
          enum: ["user", "model"],
        },
        text: {
          type: String,
          default: "",
        },
        capacities: {
          type: [Number],
          default: [],
        },
        status: {
          type: String,
          enum: ["PROCESSING", "DONE", "STOPPED", "FAILED"],
          default: "DONE",
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true },
);

module.exports = mongoose.model("AIConversation", aiConversationSchema);
