const express = require("express");
const router = express.Router();
const multer = require("multer");
const notificationsController = require("../../Controller/Notifications/notification");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/notification"); // Destination folder for uploaded files
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); // Rename file with current timestamp
  },
});

const upload = multer({ storage: storage });

router.post("/createcampaign", notificationsController.createCampaign);
router.put(
  "/createnotifications/:id",
  upload.single("image"),
  notificationsController.createNotification
);
router.get("/getallnotifications", notificationsController.getAllNotifications);
router.delete(
  "/deletenotification/:id",
  notificationsController.deleteNotifications
);
module.exports = router;
