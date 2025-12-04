const mongoose = require("mongoose");

const bannerSchema = new mongoose.Schema(
  {
    screenName: String,
    bannerImage: String,
    bannerType: String,
  },
  {
    timestamps: true,
  }
);

const Banner = mongoose.model("Banner", bannerSchema);
module.exports = Banner;
