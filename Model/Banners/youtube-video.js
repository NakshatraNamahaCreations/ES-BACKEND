const mongoose = require("mongoose");

const youtubeVideoSchema = new mongoose.Schema(
  {
    title: String,
    link: String,
    description: String,
    thumbnailImage: String,
  },
  {
    timestamps: true,
  }
);

const youtube = mongoose.model("youtubevideo", youtubeVideoSchema);
module.exports = youtube;
