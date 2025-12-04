const notification = require("../../Model/Notifications/notification");

class Notification {
  async createCampaign(req, res) {
    try {
      const { campaignType } = req.body;

      const newNotification = new notification({
        campaignType,
      });
      await newNotification.save();

      res.status(200).json({
        status: true,
        success: "Success",
        data: newNotification,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  async createNotification(req, res) {
    try {
      const campaignId = req.params.id;
      const {
        channelUsed,
        targetAudience,
        notificationTitle,
        notificationDescription,
        campaignTitle,
      } = req.body;

      let file = req.file?.filename;

      if (!campaignId) {
        return res.status(401).json({ error: "Compaign not found" });
      }
      let notifications = await notification.findOneAndUpdate(
        { _id: campaignId },
        {
          channelUsed,
          targetAudience,
          notificationTitle,
          notificationDescription,
          campaignTitle,
          image: file,
        },
        { new: true }
      );
      if (!notifications) {
        return res
          .status(404)
          .json({ status: false, message: "Something went wrong" });
      }
      return res.status(200).json({
        status: true,
        success: "Template Created",
        Data: notifications,
      });
    } catch (error) {
      console.log("Error in create Notification : ", error);
      return res.status(500).json({ error: error.message });
    }
  }

  async getAllNotifications(req, res) {
    try {
      let data = await notification.find();
      res.status(200).json({ message: "success", data: data });
    } catch (err) {
      console.log("error", err);
      res.status(400).json({ message: "fail" });
    }
  }

  async deleteNotifications(req, res) {
    try {
      const _id = req.params.id;
      const notifications = await notification.findByIdAndDelete(_id);
      if (!notifications) {
        return res
          .status(404)
          .json({ status: false, message: "Notifications not found" });
      }
      return res
        .status(200)
        .send({ status: true, success: "Notification deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

const notificationsController = new Notification();
module.exports = notificationsController;

// const express = require("express");
// const { firebase } = require("../firebase"); // Check if firebase is correctly imported
// const router = express.Router();
// const technicianmodel = require("../model/master/technician");

// const sendNotificationToMultipleDevices = async (title, body) => {
//   try {
//     // Fetch FCM tokens from the database
//     const vendors = await technicianmodel.find({}).select("fcmtoken");

//     const filterdata = vendors.filter((i) => i.fcmtoken);
//     // Check if vendors array is not empty
//     if (!vendors || vendors.length === 0) {
//       console.log("No vendors found");
//       return;
//     }

//     // Loop through each vendor and send the notification
//     const notificationPromises = filterdata.map(async (vendor) => {
//       try {
//         await firebase.messaging().send({
//           token: vendor.fcmtoken,
//           notification: {
//             title: title,
//             body: body,
//           },
//           data: {
//             navigationId: "login",
//             chatId: "12345",
//           },
//         });
//         console.log(
//           `Notification sent successfully to vendor with FCM token: ${vendor.fcmtoken}`
//         );
//       } catch (error) {
//         console.error(
//           `Error sending notification to vendor with FCM token ${vendor.fcmtoken}:`,
//           error
//         );
//       }
//     });

//     // Wait for all notifications to be sent
//     const results = await Promise.all(notificationPromises);

//     // Log results
//     results.forEach((res, index) => {
//       console.log(`Notification ${index + 1} sent successfully:`, res);
//     });
//   } catch (error) {
//     console.log("Error sending FCM notification:", error);
//   }
// };

// //Outside vendor
// router.route("/fcmpushnotificationoutvendor").post(async (req, res) => {
//   const { title, body } = req.body;
//   await sendNotificationToMultipleDevices(title, body); // Make sure to await the function call
//   res.status(200).send("Notifications sent successfully");
// });

// module.exports = router; // Export the router
