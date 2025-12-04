const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    orderId: { type: String, required: false },
    userId: {
      type: String,
      ref: "User",
      required: true,
    },
    amount: { type: Number, required: true },
    currency: { type: String, default: "INR" },
    status: {
      type: String,
      enum: ["created", "pending", "captured", "failed","manual_success"],
    },
    expiryDate: { type: Date },
    paymentId: { type: String },
    paymentdate: { type: Date },
    paymentStatus: { type: Boolean, default: false },
 planId: { type: String },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Payment", paymentSchema);
