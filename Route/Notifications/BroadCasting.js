const express = require("express");
const router = express.Router();
const multer = require("multer");
const broadCastController = require("../../Controller/Notifications/BroadCasting");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/Broadcast");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post(
  "/createbroadcast",
  upload.single("image"),
  broadCastController.addBroadCast
);
router.get("/getallbroadcast", broadCastController.getAllBroadCast);
router.delete("/deletebroadcast/:id", broadCastController.deleteBroadcast);
module.exports = router;
