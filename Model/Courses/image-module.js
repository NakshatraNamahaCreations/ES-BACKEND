const mongoose = require("mongoose");

const ImageSchema = new mongoose.Schema(
  {
    courseId: String,
    moduleId: String,
    moduleName: String,
    name: String,
    image: String,
    description: String,
    originalName: String,
    fileType: String,
  },
  {
    timestamps: true,
  }
);

const ImageModule = mongoose.model("ImageModule", ImageSchema);
module.exports = ImageModule;
