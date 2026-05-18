const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
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

  price: { type: Number, required: true },

  status: { type: String, enum: ["pending", "completed","failed"], default: "pending" },

  paymentMethod: {
    type: String,
    enum: ["stripe", "paypal", "vnpay"],
    required: true,
    default: "vnpay",
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Order", orderSchema);
