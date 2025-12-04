const express = require("express");
const router = express.Router();
const PlansController = require("../../Controller/Plan/Plan");

router.post("/addplan", PlansController.postaddplan);
router.get("/getallplan", PlansController.getallplan);
router.post("/deleteplan/:id", PlansController.postdeleteplan);
router.put("/updatedplan/:ccid", PlansController.updateplan);

module.exports = router;
