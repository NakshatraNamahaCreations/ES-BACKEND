const express = require("express");
const router = express.Router();
const freeMaterialVideoController = require("../../Controller/Content/free-material-video");

router.post("/addlink", freeMaterialVideoController.addYouTubeLink);
router.get("/getallvideo", freeMaterialVideoController.getAllVideo);
router.get("/getvideobyid/:id", freeMaterialVideoController.getVideoById);
// router.put(
//   "/updatebanner/:id",
//   upload.single("bannerImage"),
//   bannerController.updateBannerById
// );
router.delete("/deletevideo/:id", freeMaterialVideoController.deleteVideo);

module.exports = router;
