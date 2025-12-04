const express = require("express");
const router = express.Router();
const multer = require("multer");
const inAppNotificationsController = require("../../Controller/Notifications/inAppNotification");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/inAppNotification");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post("/createnotification", upload.single("image"), inAppNotificationsController.addNotifications);
router.get("/getallnotifications", inAppNotificationsController.getAllNotifications);
// router.delete(
//   "/deletenotification/:id",
//   inAppNotificationsController.deleteNotifications
// );
module.exports = router;
