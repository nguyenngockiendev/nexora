const mongoose = require("mongoose");

const aiUsageSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  usedTokens: {
    type: Number,
    default: 0,
    min: 0,
  },
  status: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 12 * 60 * 60,
  },
});

module.exports = mongoose.model("AIUsage", aiUsageSchema);
