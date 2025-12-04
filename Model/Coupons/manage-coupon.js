const mongoose = require("mongoose");

const couponSchema = new mongoose.Schema(
  {
    offerName: String,
    couponCode: String,
    discountAmount: Number,
    minimumOrder: Number,
    startDate: Date,
    startTime: String,
    endDate: Date,
    endTime: String,
    couponType: String,
    // courseSeletionType: String,
    couponLimitation: Number,
    usagesPerStudent: Number,
    couponStatus: Boolean,
    appliedCourses: Array,
  },
  {
    timestamps: true,
  }
);

const Coupon = mongoose.model("coupon", couponSchema);
module.exports = Coupon;
