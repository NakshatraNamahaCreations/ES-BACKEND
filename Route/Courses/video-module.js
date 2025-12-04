const express = require("express");
const router = express.Router();
const videoController = require("../../Controller/Courses/video-module");

router.post("/addvideoformodule", videoController.addVideo);
// router.put(
//   "/addvideobymoduleid/:id",
//   courseModulesController.addVideoByModuleId
// );
router.get("/getallvideos", videoController.getAllVideos);
router.get("/getvideobymoduleid/:id", videoController.getVideoByModuleId);

module.exports = router;
