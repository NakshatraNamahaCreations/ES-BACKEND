const express = require("express");
const router = express.Router();
const AsinsController = require("../../Controller/Plan/asin");

router.post("/addasin", AsinsController.postaddasin);
router.get("/getallasin", AsinsController.getalasin);
router.get("/getasin/:asin", AsinsController.getoneasin);
router.post("/deleteasin/:id", AsinsController.postdeleteasin);
router.put("/updateasin/:ccid", AsinsController.updateasin);
router.post("/user/update-searchcount", AsinsController.updateSearchCount);

module.exports = router;
