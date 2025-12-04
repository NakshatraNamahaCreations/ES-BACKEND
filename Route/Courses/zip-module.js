const express = require("express");
const router = express.Router();
const zipController = require("../../Controller/Courses/zip-module");
const multer = require("multer");

// Storage configuration
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/zip"); // Destination folder for uploaded files
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); // Rename file with current timestamp
  },
});

const upload = multer({ storage: storage });

router.post("/addzipformodule", upload.single("zip"), zipController.addZip);
// router.put(
//   "/addvideobymoduleid/:id",
//   courseModulesController.addVideoByModuleId
// );
router.get("/getallzip", zipController.getAllZip);
router.get("/getzipbymoduleid/:id", zipController.getZipFileByModuleId);

module.exports = router;
