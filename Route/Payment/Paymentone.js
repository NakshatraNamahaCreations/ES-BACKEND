const express = require("express");
const router = express.Router();
const paymentoneController = require("../../Controller/Payment/Paymentone");

router.get("/pabbly/plans", paymentoneController.getPabblyPlans);



module.exports = router;
