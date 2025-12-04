const express = require("express");
const router = express.Router();
const planCouponController = require("../../Controller/Coupons/Coupon");

router.post("/addplanCoupon", planCouponController.addplanCoupon);
router.get("/getAllplanCoupon", planCouponController.getAllplanCoupon);
router.delete("/deleteplanCoupon/:id", planCouponController.deleteplanCoupon);

module.exports = router;
