const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    orderId: { type: String, unique: true },
    userId: {
      type: String,
      ref: "User",
      required: true,
    },
    amount: { type: Number, required: true },
    currency: { type: String, default: "INR" },
    status: {
      type: String,
      enum: ["created", "pending", "captured", "failed"],
    },
    expiryDate: { type: Date },
    paymentId: { type: String },
    paymentdate: { type: Date },
    paymentStatus: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Payment", paymentSchema);
