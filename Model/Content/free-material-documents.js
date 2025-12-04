const mongoose = require("mongoose");

const freeMaterialDocumentSchema = new mongoose.Schema(
  {
    documentImage: String,
    originalName: String,
    fileType: String,
  },
  {
    timestamps: true,
  }
);

const freeMaterialDoc = mongoose.model(
  "FreeMaterialDocument",
  freeMaterialDocumentSchema
);
module.exports = freeMaterialDoc;
