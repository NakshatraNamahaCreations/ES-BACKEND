const mongoose = require("mongoose");

const freeMaterialSchema = new mongoose.Schema(
  {
    materialDocuments: [
      {
        documentImage: String,
        originalName: String,
      },
    ],
    materialType: String,
    youtubeLink: String,
    thumbnailTitle: String,
  },
  {
    timestamps: true,
  }
);

const freeMaterial = mongoose.model("FreeMaterial", freeMaterialSchema);
module.exports = freeMaterial;
