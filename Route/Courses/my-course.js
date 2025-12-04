const express = require("express");
const router = express.Router();
const multer = require("multer");
const courseController = require("../../Controller/Courses/my-course");

// Storage configuration
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/course"); // Destination folder for uploaded files
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); // Rename file with current timestamp
  },
});

var resourceStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/resource"); // Destination folder for uploaded files
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); // Rename file with current timestamp
  },
});
const upload = multer({ storage: storage });
const upload1 = multer({ storage: resourceStorage });

router.post(
  "/addcourse",
  upload.single("thumbnailImage"),
  courseController.addCourse
);
// router.post("/addlink", courseController.addYouTubeLink);
router.get("/getallcourses", courseController.getAllCourse);
router.get("/getcoursebyid/:id", courseController.getCourseById);
router.put(
  "/updatecourse/:id",
  upload.single("thumbnailImage"),
  courseController.updateCourse
);
router.put(
  "/addresources/:id",
  upload1.array("externalContent"),
  courseController.uploadResourceToCourse
);
router.put(
  "/addimportantrequirement/:id",
  upload1.array("externalContent"),
  courseController.uploadRequirementsToCourse
);
router.delete(
  "/deleteresourcesorimportantreq/:id",
  courseController.deleteResourcesOrimportantReq
);
router.put("/markcoursefeatured/:id", courseController.markFeatured);
router.put("/removecoursefeatured/:id", courseController.removeFeatured);
router.put("/coursepublish/:id", courseController.publishCourse);
router.put("/courseunpublish/:id", courseController.unPublishCourse);
router.delete("/deletecourse/:id", courseController.deleteCourseById);

module.exports = router;
