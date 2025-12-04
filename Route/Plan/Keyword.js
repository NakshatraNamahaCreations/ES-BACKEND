const express = require("express");
const router = express.Router();
const KeywordController = require("../../Controller/Plan/Keyword");

router.post("/addkeyword", KeywordController.postaddkeyword);
router.get("/getallkeyword", KeywordController.getallkeyword);
router.post("/deletekeyword/:id", KeywordController.postdeletekeyword);
router.put("/updatekeyword/:ccid", KeywordController.updatekeyword);
router.post(
  "/user/update-searchcount",
  KeywordController.updateSearchCountkeyword
);

module.exports = router;
