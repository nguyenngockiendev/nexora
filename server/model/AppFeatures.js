const mongoose = require("mongoose");

const appFeatureSchema = new mongoose.Schema(
  {
    featureCode: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    keywords: {
      type: [String],
      default: [],
    },

    steps: {
      type: [String],
      default: [],
    },

    route: {
      type: String,
      required: true,
      trim: true,
    },

    roles: {
      type: [{ type: String, enum: ["student", "instructor", "admin"] }],
      required: true,
      default: undefined,
    },

    embedding: {
      type: [Number],
      default: undefined,
    },

    embeddingModel: {
      type: String,
      required: true,
      default: "gemini-embedding-2",
    },
  },
  { timestamps: true, collection: "app_features" },
);

module.exports = mongoose.model("AppFeature", appFeatureSchema);
