const mongoose = require("mongoose");

const freeMaterialVideoSchema = new mongoose.Schema(
  {
    youtubeLink: String,
    thumbnailTitle: String,
  },
  {
    timestamps: true,
  }
);

const freeMaterialVideo = mongoose.model(
  "FreeMaterialvideo",
  freeMaterialVideoSchema
);
module.exports = freeMaterialVideo;
