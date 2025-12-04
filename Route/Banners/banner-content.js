const express = require("express");
const router = express.Router();
const multer = require("multer");
const bannerController = require("../../Controller/Banners/banner-content");

var storage = multer.diskStorage({
  // Storage setup
  destination: function (req, file, cb) {
    cb(null, "public/banners"); // Destination folder for uploaded files
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); // Rename file with current timestamp
  },
});

const upload = multer({ storage: storage });

router.post(
  "/createbanner",
  upload.single("bannerImage"),
  bannerController.createBanner
);
router.get("/getwebbanner", bannerController.getWebBanner);
router.get("/getappbanner", bannerController.getAppBanner);
router.get("/bannerbyid/:id", bannerController.getBannerById);
router.put(
  "/updatebanner/:id",
  upload.single("bannerImage"),
  bannerController.updateBannerById
);
router.delete("/deletebanner/:id", bannerController.deleteBannerById);

module.exports = router;
