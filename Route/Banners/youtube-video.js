const express = require("express");
const router = express.Router();
const multer = require("multer");
const youtubeVideoController = require("../../Controller/Banners/youtube-video");

var storage = multer.diskStorage({
  // Storage setup
  destination: function (req, file, cb) {
    cb(null, "public/youtube");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post(
  "/addvideo",
  upload.single("thumbnailImage"),
  youtubeVideoController.createYoutubeVideo
);
router.get("/getallvideo", youtubeVideoController.getAllVideos);
// router.get("/bannerbyid/:id", youtubeVideoController.getBannerById);
// router.put(
//   "/updatebanner/:id",
//   upload.single("bannerImage"),
//   youtubeVideoController.updateBannerById
// );
router.delete("/deletevideo/:id", youtubeVideoController.deleteVideo);

module.exports = router;
