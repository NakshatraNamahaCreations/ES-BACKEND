const Razorpay = require("razorpay");
const User = require("../../Model/Peoples/user");
const Order = require("../../Model/Payment/Payment");
const Plan = require("../../Model/Plan/Plan");
const PaymentKey = require("../../Model/Payment/Paymentkey");
const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

// const razorpay = new Razorpay({
//   key_id: "rzp_live_gZWb9zLxROzkYB",
//   key_secret: "QqMPKEZnithH2onkIQi4U7Jh",
// });

// const createOrder = async (req, res) => {
//   const { amount, currency = "INR", userId } = req.body;

//   if (!amount || !userId) {
//     return res.status(400).json({ message: "Amount and User ID are required" });
//   }

//   try {
//     const options = {
//       amount: amount * 100,
//       currency,
//       receipt: `receipt_${Date.now()}`,
//       payment_capture: 1,
//     };

//     const razorpayOrder = await razorpay.orders.create(options);

//     const newOrder = new Order({
//       orderId: razorpayOrder?.id,
//       userId,
//       amount,
//       currency: razorpayOrder?.currency,
//     });
//     await newOrder.save();

//     res.status(200).json({
//       message: "Order created successfully",
//       orderId: razorpayOrder.id,
//       amount: razorpayOrder.amount,
//       currency: razorpayOrder.currency,
//     });
//   } catch (error) {
//     console.error("Error creating Razorpay order:", error);
//     res.status(500).json({ message: "Failed to create order" });
//   }
// };

// const createOrder = async (req, res) => {
//   const { amount, currency = "INR", userId } = req.body;

//   if (!amount || !userId) {
//     return res.status(400).json({ message: "Amount and User ID are required" });
//   }

//   try {
//     // Fetch active Razorpay keys
//     const activeKey = await PaymentKey.findOne({ itemgroupstatus: "Active" });
//     if (!activeKey) {
//       return res.status(404).json({ message: "No active Razorpay keys found" });
//     }

//     // Initialize Razorpay with dynamic keys
//     const razorpay = new Razorpay({
//       key_id: activeKey.reazorpaykey_id,
//       key_secret: activeKey.reazorpaykey_secret,
//     });

//     // Create Razorpay order
//     const options = {
//       amount: amount * 100, // Convert to paise
//       currency,
//       receipt: `receipt_${Date.now()}`,
//       payment_capture: 1,
//     };

//     const razorpayOrder = await razorpay.orders.create(options);

//     // Save order in database
//     const newOrder = new Order({
//       orderId: razorpayOrder.id,
//       userId,
//       amount,
//       currency: razorpayOrder.currency,
//     });
//     await newOrder.save();

//     res.status(200).json({
//       message: "Order created successfully",
//       orderId: razorpayOrder.id,
//       amount: razorpayOrder.amount,
//       currency: razorpayOrder.currency,
//     });
//   } catch (error) {
//     console.error("Error creating Razorpay order:", error);
//     res.status(500).json({ message: "Failed to create order" });
//   }
// };

// const verifyPayment = async (req, res) => {
//   const { paymentId } = req.params;
//   const { userId, planId } = req.query;
//   if (!paymentId || !userId || !planId) {
//     return res
//       .status(400)
//       .json({ message: "Payment ID, User ID, and Plan ID are required" });
//   }
//   try {
//     const activeKey = await PaymentKey.findOne({ itemgroupstatus: "Active" });
//     if (!activeKey) {
//       return res.status(404).json({ message: "No active Razorpay keys found" });
//     }

//     // Initialize Razorpay with dynamic keys
//     const razorpay = new Razorpay({
//       key_id: activeKey.reazorpaykey_id,
//       key_secret: activeKey.reazorpaykey_secret,
//     });

//     const payment = await razorpay.payments.fetch(paymentId);
//     if (!payment || payment.status !== "captured") {
//       return res
//         .status(400)
//         .json({ message: "Payment not captured or invalid" });
//     }
//     const user = await User.findById(userId);
//     const plan = await Plan.findById(planId);
//     if (!user || !plan) {
//       return res.status(404).json({ message: "User or Plan not found" });
//     }

//     const expiryDate = new Date();
//     if (plan.validPeriod === "Month") {
//       expiryDate.setMonth(expiryDate.getMonth() + plan.noOfPeriod);
//     } else if (plan.validPeriod === "Year") {
//       expiryDate.setFullYear(expiryDate.getFullYear() + plan.noOfPeriod);
//     }
//     user.searchcount = 0;
//     user.searchLimit = plan.searchCount;
//     user.expiryDate = expiryDate;
//     user.paymentdate = new Date();
//     await user.save();
//     let order = await Order.findOne({ orderId: payment.order_id });
//     if (order) {
//       order.paymentId = payment.id;
//       order.status = payment.status;
//       order.paymentStatus = true;
//       order.expiryDate = expiryDate;
//       order.planId = planId;
//       await order.save();
//     } else {
//       order = new Order({
//         userId,
//         orderId: payment.order_id,
//         paymentId: payment.id,
//         status: payment.status,
//         amount: payment.amount,
//         currency: payment.currency,
//         expiryDate,
//         planId,
//         paymentStatus: true,
//       });
//       await order.save();
//     }
//     res.status(200).json({
//       message: "Payment verified and plan activated successfully",
//       expiryDate,
//       searchCount: user.searchLimit,
//       orderDetails: order,
//     });
//   } catch (error) {
//     console.error("Error verifying payment or updating user:", error);
//     res.status(500).json({
//       message: "Failed to verify payment and activate plan",
//       error: error.message,
//     });
//   }
// };

const createOrder = async (req, res) => {
  const { amount, currency = "INR", userId } = req.body;

  if (!amount || !userId) {
    return res.status(400).json({ message: "Amount and User ID are required" });
  }

  try {
    // Fetch active Razorpay keys
    const activeKey = await PaymentKey.findOne({ itemgroupstatus: "Active" });
    if (!activeKey) {
      return res.status(404).json({ message: "No active Razorpay keys found" });
    }

    // Initialize Razorpay with dynamic keys
    const razorpay = new Razorpay({
      key_id: activeKey.reazorpaykey_id,
      key_secret: activeKey.reazorpaykey_secret,
    });

    // Create Razorpay order
    const options = {
      amount: amount * 100, // Convert to paise
      currency,
      receipt: `receipt_${Date.now()}`,
      payment_capture: 1,
    };

    const razorpayOrder = await razorpay.orders.create(options);

    // Return the order details to the frontend
    res.status(200).json({
      message: "Order created successfully",
      orderId: razorpayOrder.id,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
    });
  } catch (error) {
    console.error("Error creating Razorpay order:", error);
    res.status(500).json({ message: "Failed to create order" });
  }
};

const verifyPayment = async (req, res) => {
  const { paymentId } = req.params;
  const { userId, planId, couponCode } = req.query;

  if (!paymentId || !userId || !planId) {
    return res
      .status(400)
      .json({ message: "Payment ID, User ID, and Plan ID are required" });
  }

  try {
    // Fetch active Razorpay keys
    const activeKey = await PaymentKey.findOne({ itemgroupstatus: "Active" });
    if (!activeKey) {
      return res.status(404).json({ message: "No active Razorpay keys found" });
    }

    // Initialize Razorpay with dynamic keys
    const razorpay = new Razorpay({
      key_id: activeKey.reazorpaykey_id,
      key_secret: activeKey.reazorpaykey_secret,
    });

    // Verify payment using Razorpay API
    const payment = await razorpay.payments.fetch(paymentId);
    if (!payment || payment.status !== "captured") {
      return res
        .status(400)
        .json({ message: "Payment not captured or invalid" });
    }

    // Fetch user and plan details
    const user = await User.findById(userId);
    const plan = await Plan.findById(planId);
    if (!user || !plan) {
      return res.status(404).json({ message: "User or Plan not found" });
    }

    if (couponCode && user.usedCoupons.includes(couponCode)) {
      return res
        .status(400)
        .json({ message: "Coupon code already used by this user" });
    }

    // Calculate expiry date based on plan
    const expiryDate = new Date();
    if (plan.validPeriod === "Month") {
      expiryDate.setMonth(expiryDate.getMonth() + plan.noOfPeriod);
    } else if (plan.validPeriod === "Year") {
      expiryDate.setFullYear(expiryDate.getFullYear() + plan.noOfPeriod);
    }

    // Update user details
    user.searchcount = 0;
    user.searchLimit = plan.searchCount;
    user.expiryDate = expiryDate;
    user.paymentdate = new Date();

    if (couponCode) {
      user.usedCoupons.push(couponCode);
    }

    await user.save();

    // Store order details in the database
    const newOrder = new Order({
      orderId: payment.order_id,
      userId,
      paymentId: payment.id,
      amount: payment.amount,
      currency: payment.currency,
      status: payment.status,
      expiryDate,
      planId,
      paymentStatus: true,
    });
    await newOrder.save();

    res.status(200).json({
      message: "Payment verified and plan activated successfully",
      expiryDate,
      searchCount: user.searchLimit,
      orderDetails: newOrder,
    });
  } catch (error) {
    console.error("Error verifying payment or updating user:", error);
    res.status(500).json({
      message: "Failed to verify payment and activate plan",
      error: error.message,
    });
  }
};

const manualPaymentActivate = async (req, res) => {
  const { userId, planId, couponCode } = req.body;

  if (!userId || !planId) {
    return res
      .status(400)
      .json({ message: "User ID and Plan ID are required" });
  }

  try {
    const user = await User.findById(userId);
    const plan = await Plan.findById(planId);

    if (!user || !plan) {
      return res.status(404).json({ message: "User or Plan not found" });
    }

    if (couponCode && user.usedCoupons.includes(couponCode)) {
      return res
        .status(400)
        .json({ message: "Coupon code already used by this user" });
    }

    const expiryDate = new Date();
    if (plan.validPeriod === "Month") {
      expiryDate.setMonth(expiryDate.getMonth() + plan.noOfPeriod);
    } else if (plan.validPeriod === "Year") {
      expiryDate.setFullYear(expiryDate.getFullYear() + plan.noOfPeriod);
    }

    user.searchcount = 0;
    user.searchLimit = plan.searchCount;
    user.expiryDate = expiryDate;
    user.paymentdate = new Date();

    if (couponCode) {
      user.usedCoupons.push(couponCode);
    }

    await user.save();

    const newPayment = new Order({
      orderId: `manual_${Date.now()}_${uuidv4()}`,
      userId,
      amount: plan.price,
      currency: "INR",
      status: "manual_success",
      expiryDate,
      paymentStatus: true,
      planId,
      paymentdate: new Date(),
      couponcode: couponCode || undefined,
    });

    await newPayment.save();

    res.status(200).json({
      message: "Manual payment recorded and plan activated successfully",
      expiryDate,
      searchCount: user.searchLimit,
      orderDetails: newPayment,
    });
  } catch (error) {
    console.error("Manual payment error:", error);
    res.status(500).json({
      message: "Failed to activate plan manually",
      error: error.message,
    });
  }
};

const getAllUser = async (req, res) => {
  try {
    const allUsers = await Order.find({});

    return res.status(200).json({ allUsers });
  } catch (error) {
    console.error("Error fetching all users:", error);

    res.status(500).json({ error: "Server error. Please try again later." });
  }
};

const findUserById = async (req, res) => {
  const { userId } = req.params;
  if (!userId) {
    return res.status(400).json({ message: "User ID is required" });
  }
  try {
    const payments = await Order.find({ userId });
    if (!payments || payments.length === 0) {
      return res
        .status(404)
        .json({ message: "No payments found for this user" });
    }
    res.status(200).json({
      message: "Payments found successfully",
     data: payments,
    });
  } catch (error) {
    console.error("Error finding payments by user ID:", error);
    res.status(500).json({ message: "Failed to find payments" });
  }
};

module.exports = { createOrder, verifyPayment, findUserById, getAllUser,manualPaymentActivate };
