const express = require("express");
const router = express.Router();
const TrytoookController = require("../../Controller/Payment/Trytobook");

router.post("/postaddtrytobook", TrytoookController.postaddtrytobook);
router.get("/getalltrytobook", TrytoookController.getalltrytobook);
router.post("/postdeletetrytobook/:id", TrytoookController.postdeletetrytobook);
router.put("/updatetrytobook/:ccid", TrytoookController.updatetrytobook);

module.exports = router;
