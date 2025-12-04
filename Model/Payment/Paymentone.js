
const mongoose = require("mongoose");

const paymentoneSchema = new mongoose.Schema({
  orderId: String,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  planId: { type: mongoose.Schema.Types.ObjectId, ref: "Plan" },
  subscriptionId: String,
  paymentId: String,
  amount: Number,
  currency: String,
  status: String,
  paymentStatus: { type: Boolean, default: false },
  expiryDate: Date,
  isSubscription: { type: Boolean, default: false },
  razorpayPlanId: String,
  paymentGateway: String,
  couponcode: String,
  raw: mongoose.Schema.Types.Mixed,
}, { timestamps: true });

module.exports = mongoose.model("paymentone", paymentoneSchema);
