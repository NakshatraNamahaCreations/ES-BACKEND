const mongoose = require("mongoose");

const plancouponSchema = new mongoose.Schema(
  {
    couponCode: String,
    discount: Number,
planid: String,
  },
  {
    timestamps: true,
  }
);

const PlanCoupon = mongoose.model("plancoupon", plancouponSchema);
module.exports = PlanCoupon;
