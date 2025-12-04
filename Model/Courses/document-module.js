const mongoose = require("mongoose");

const DocumentSchema = new mongoose.Schema(
  {
    courseId: String,
    moduleId: String,
    moduleName: String,
    name: String,
    document: String,
    description: String,
    originalName: String,
    fileType: String
  },
  {
    timestamps: true,
  }
);

const DocumentModule = mongoose.model("DocumentModule", DocumentSchema);
module.exports = DocumentModule;
