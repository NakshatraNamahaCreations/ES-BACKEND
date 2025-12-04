const mongoose = require("mongoose");

const notification = new mongoose.Schema(
  {
    campaignType: String,
    channelUsed: String,
    targetAudience: String,
    campaignTitle: String,
    notificationDescription: String,
    notificationTitle: String,
    image: String,
  },
  {
    timestamps: true,
  }
);

const pushNotification = mongoose.model("notification", notification);

module.exports = pushNotification;
