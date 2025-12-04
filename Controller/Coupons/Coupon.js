const couponSchema = require("../../Model/Coupons/Coupon");

class CouponplanModule {
  async addplanCoupon(req, res) {
    try {
      const { couponCode, discount,planid } = req.body;

      const newCoupon = new couponSchema({
        couponCode,
        discount,
planid,
      });
      await newCoupon.save();
      res.status(200).json({
        status: true,
        success: "Coupon Added",
        data: newCoupon,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getAllplanCoupon(req, res) {
    try {
      const couponList = await couponSchema.find();
      res.status(200).json({
        status: true,
        data: couponList,
        count: couponList.length,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `Server Error` });
    }
  }

  async deleteplanCoupon(req, res) {
    try {
      const id = req.params.id;
      const coupon = await couponSchema.findOneAndDelete({ _id: id });
      if (!coupon) {
        return res
          .status(404)
          .json({ status: false, message: "Coupon not found" });
      }
      return res
        .status(200)
        .send({ status: true, success: "Coupon deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

const planCouponController = new CouponplanModule();
module.exports = planCouponController;
