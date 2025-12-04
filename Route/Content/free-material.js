const express = require("express");
const router = express.Router();
const multer = require("multer");
const freeMaterialController = require("../../Controller/Content/free-material");

// Storage configuration
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/documents");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post(
  "/adddocuments",
  upload.array("materialDocuments"),
  freeMaterialController.addDocuments
);
router.post("/addlink", freeMaterialController.addYouTubeLink);
router.get("/getalldocument", freeMaterialController.getAllDocuments);
router.get("/getallvideo", freeMaterialController.getAllVideo);
// router.put(
//   "/updatebanner/:id",
//   upload.single("bannerImage"),
//   bannerController.updateBannerById
// );
router.delete("/deletedocuments/:id", freeMaterialController.deleteDocument);
router.delete("/deletevideo/:id", freeMaterialController.deleteVideo);

module.exports = router;
