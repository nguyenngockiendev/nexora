const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    Totalprice: { type: Number, required: true },

    status: {
      type: String,
      enum: ["pending", "completed", "failed"],
      default: "pending",
    },

    paymentMethod: {
      type: String,
      enum: ["stripe", "paypal", "vnpay", "QR", "sepay"],
      required: true,
      default: "QR",
    },
    items: [
      {
        courseId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Course",
          required: true,
        },
        classId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Class",
          default: null,
        },
        type: {
          type: String,
          enum: ["recorded", "live", "free"],
          required: true,
          default: "recorded",
        },
        price: {
          type: Number,
          required: true,
          default: 0,
        },
        addedAt: {
          type: Date,
          default: Date.now,
        },
      },
      { _id: true },
    ],
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Order", orderSchema);
