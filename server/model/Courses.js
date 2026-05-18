const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },

  description: { type: String, required: true, trim: true },

  price: { type: Number, required: true },

  thumbnail: { type: String, required: true },

  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
 type: { type: String, enum: ["free", "recorded", "live"], required: true },
  level: {
    type: String,
    enum: ["beginner", "intermediate", "advanced"],
    required: true,
  },
});
module.exports = mongoose.model("Course", courseSchema);