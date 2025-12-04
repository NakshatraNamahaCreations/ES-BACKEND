const express = require("express");
const router = express.Router();
const imageController = require("../../Controller/Courses/image-module");
const multer = require("multer");

// Storage configuration
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/image"); // Destination folder for uploaded files
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); // Rename file with current timestamp
  },
});

const upload = multer({ storage: storage });

router.post(
  "/addimageformodule",
  upload.single("image"),
  imageController.addImageModule
);
// router.put(
//   "/addvideobymoduleid/:id",
//   courseModulesController.addVideoByModuleId
// );
router.get("/getallimages", imageController.getAllImages);
router.get("/getimagebymoduleid/:id", imageController.getImageByModuleId);

module.exports = router;
