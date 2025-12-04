const mongoose = require("mongoose");

const ZipSchema = new mongoose.Schema(
  {
    courseId: String,
    moduleId: String,
    moduleName: String,
    name: String,
    zip: String,
    description: String,
  },
  {
    timestamps: true,
  }
);

const ZipModule = mongoose.model("ZipModule", ZipSchema);
module.exports = ZipModule;
