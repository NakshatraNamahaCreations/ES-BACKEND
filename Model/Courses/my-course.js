const mongoose = require("mongoose");

const myCourseSchema = new mongoose.Schema(
  {
    // Add Course
    courseName: String,
    courseDescription: String,
    freeMaterialDocs: String,
    materialDocsId: String,
    freeMaterialVideo: String,
    materialVideoId: String,
    thumbnailImage: String,
    durationType: String,
    validity: String,
    validityPeriod: String,
    price: Number,
    discount: Number,
    effectivePrice: Number,
    courseFeature: Boolean,
    coursePublish: Boolean,
    externalContent: [
      {
        documentOrImage: String,
        originalName: String,
        contentType: String,
        fileType: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const myCourse = mongoose.model("MyCourse", myCourseSchema);
module.exports = myCourse;
