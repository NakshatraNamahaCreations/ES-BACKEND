const inAppNotification = require("../../Model/Notifications/inAppNotification");

class InAppNotification {
  async addNotifications(req, res) {
    try {
      const {
        notification,
      } = req.body;
      let file = req.file?.filename;
      const newNotification = new inAppNotification({
        notification,
      image: file,
      });
      if (!file) {
        return res.status(500).json({
          status: 500,
          error: "Please select image",
        });
      }
      await newNotification.save();
      res.status(200).json({
        status: true,
        success: "Added",
        data: newNotification,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getAllNotifications(req, res) {
    try {
      const allNotifications = (await inAppNotification.find()).reverse(true);
      if (allNotifications.length > 0) {
        return res.status(200).json({
          status: true,
          data: allNotifications,
        });
      }
    } catch (error) {
      return res.status(500).json({
        status: false,
        message: "Internal Server Error",
        error,
      });
    }
  }

}

const inAppNotificationsController = new InAppNotification();
module.exports = inAppNotificationsController;
