const mongoose = require("mongoose");

const courseModuleSchema = new mongoose.Schema(
  {
    courseName: String,
    courseId: String,
    moduleTitle: String,
    description: String,
    // videoAdd: [
    //   {
    //     name: String,
    //     link: String,
    //     description: String,
    //   },
    // ],
    // documentsAdd: [
    //   {
    //     name: String,
    //     description: String,
    //     document: String,
    //   },
    // ],
    // imageAdd: [
    //   {
    //     name: String,
    //     description: String,
    //     image: String,
    //   },
    // ],
    // zipAdd: [
    //   {
    //     name: String,
    //     description: String,
    //     zip: String,
    //   },
    // ],
  },
  {
    timestamps: true,
  }
);

const CourseModule = mongoose.model("CourseModule", courseModuleSchema);
module.exports = CourseModule;
