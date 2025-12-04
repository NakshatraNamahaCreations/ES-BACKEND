const couponSchema = require("../../Model/Coupons/manage-coupon");

class CouponModule {
  async addCoupon(req, res) {
    try {
      const {
        offerName,
        couponCode,
        discountAmount,
        minimumOrder,
        startDate,
        startTime,
        endDate,
        endTime,
        couponType,
        // courseSeletionType,
        couponLimitation,
        usagesPerStudent,
      } = req.body;

      const newCoupon = new couponSchema({
        offerName,
        couponCode,
        discountAmount,
        minimumOrder,
        startDate,
        startTime,
        endDate,
        endTime,
        couponType,
        // courseSeletionType,
        couponLimitation,
        usagesPerStudent,
        couponStatus: false,
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

  async applyCourse(req, res) {
    try {
      const _id = req.params.id;
      const findCoupon = await couponSchema.findById(_id); // Use findById to find the coupon by ID

      if (!findCoupon)
        return res.status(404).json({ error: "Coupon not found" });

      const { appliedCourses } = req.body;

      // Update the appliedCourses array of the found coupon
      findCoupon.appliedCourses = appliedCourses;

      // Save the updated coupon
      await findCoupon.save();

      res.status(200).json({
        status: true,
        success: "Course applied",
        data: findCoupon, // Return the updated coupon
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  async removeCourse(req, res) {
    try {
      const couponId = req.params.id;
      const courseIdToRemove = req.body.courseId; // Assuming courseId is passed in the request body

      const updatedCoupon = await couponSchema.updateOne(
        { _id: couponId },
        { $pull: { appliedCourses: { courseId: courseIdToRemove } } }
      );

      if (updatedCoupon.nModified === 0) {
        return res
          .status(404)
          .json({ error: "Coupon not found or course not found in coupon" });
      }

      res.status(200).json({
        status: true,
        success: "Course removed from coupon",
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getAllCoupon(req, res) {
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

  async getCouponById(req, res) {
    try {
      const couponObj = await couponSchema.findById(req.params.id);
      if (!couponObj) {
        return res.status(404).json({ message: "Coupon not found" });
      }
      res.status(200).json(couponObj);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  async makeActive(req, res) {
    try {
      const _id = req.params.id;
      const coupon = await couponSchema.findByIdAndUpdate(
        _id,
        { $set: { couponStatus: true } },
        { new: true }
      );

      if (!coupon) {
        res.status(404).json({ error: "coupon not found" });
      } else {
        return res.status(201).send({
          statusCode: 200,
          success: true,
          data: coupon,
          message: "Status changed",
        });
      }
    } catch (error) {
      console.log("error", error);
      return res
        .status(500)
        .json({ error: "Unable to update the details! Try again later" });
    }
  }
  async makeInActive(req, res) {
    try {
      const _id = req.params.id;
      const coupon = await couponSchema.findByIdAndUpdate(
        _id,
        { $set: { couponStatus: false } },
        { new: true }
      );

      if (!coupon) {
        res.status(404).json({ error: "coupon not found" });
      } else {
        return res.status(201).send({
          statusCode: 200,
          success: true,
          data: coupon,
          message: "Status changed",
        });
      }
    } catch (error) {
      console.log("error", error);
      return res
        .status(500)
        .json({ error: "Unable to update the details! Try again later" });
    }
  }

  async deleteCoupon(req, res) {
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

const CouponController = new CouponModule();
module.exports = CouponController;
