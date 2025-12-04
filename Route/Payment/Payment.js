const express = require("express");
const {
  createOrder,
  verifyPayment,
  findUserById,
  getAllUser,
manualPaymentActivate,
} = require("../../Controller/Payment/Payment");

const router = express.Router();

// Route to create an order
router.post("/orders", createOrder);

// Route to verify a payment

router.get("/payment/:paymentId", verifyPayment);
router.get("/find-user/:userId", findUserById);
router.get("/alluser", getAllUser);
router.post("/manual-payment", manualPaymentActivate);

module.exports = router;
