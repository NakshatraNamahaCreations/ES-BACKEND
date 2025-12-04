const express = require("express");
const router = express.Router();
const paymentkeyController = require("../../Controller/Payment/Paymentkey");

router.post("/addpaymentkey", paymentkeyController.addPaymentKeys);
router.get("/getallitemgroups", paymentkeyController.getAllItemGroups);
router.get("/getanitemgroups/:id", paymentkeyController.getAnItemGroup);
router.put("/edititemgroups/:id", paymentkeyController.editItemGroups);
router.delete("/deleteitemgroups/:id", paymentkeyController.deleteItemGroups);
router.put("/itemgroupstatus/:id", paymentkeyController.itemGroupStatus);
router.get(
  "/getAllreazorpaypayment",
  paymentkeyController.getAllreazorpaypayment
);

module.exports = router;
