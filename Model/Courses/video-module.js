const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema(
  {
    courseId: String,
    moduleId: String,
    moduleName: String,
    name: String,
    videoLink: String,
    description: String,
  },
  {
    timestamps: true,
  }
);

const VideoModule = mongoose.model("VideoModule", videoSchema);
module.exports = VideoModule;
