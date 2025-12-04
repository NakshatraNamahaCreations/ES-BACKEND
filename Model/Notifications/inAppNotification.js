const mongoose = require("mongoose");

const inApp = new mongoose.Schema(
  {
    notification: String,
    image: String,
  },
  {
    timestamps: true,
  }
);

const inAppNoti = mongoose.model("inappnotification", inApp);

module.exports = inAppNoti;
