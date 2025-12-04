const express = require("express");
const router = express.Router();
const CouponController = require("../../Controller/Coupons/manage-coupon");

router.post("/addcoupon", CouponController.addCoupon);
router.get("/getallcoupon", CouponController.getAllCoupon);
router.get("/getcouponbyid/:id", CouponController.getCouponById);
router.delete("/deletecoupon/:id", CouponController.deleteCoupon);
router.delete("/deletecoursefromcoupon/:id", CouponController.removeCourse);
router.put("/applycouponforcourse/:id", CouponController.applyCourse);
router.put("/makecouponactive/:id", CouponController.makeActive);
router.put("/makecouponinactive/:id", CouponController.makeInActive);
module.exports = router;
