const mongoose = require("mongoose");

const ratingReviewSchema = new mongoose.Schema(
  {
    userId: String,
    courseId: String,
    userName:String,
    courseName:String,
    rating: Number,
    review: String,
  },
  {
    timestamps: true,
  }
);

const RatingReview = mongoose.model("RatingReview", ratingReviewSchema);

module.exports = RatingReview;
