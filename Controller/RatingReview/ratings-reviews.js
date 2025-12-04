const RatingReview = require("../../Model/RatingReview/ratings-reviews");

class RatingsAndReview {
  async addRatingReview(req, res) {
    try {
      const { userId,userName,courseName,courseId, rating, review } = req.body;
      const newRatingReview = await RatingReview.create({
        userId,
        courseId,
	userName,
	courseName,
        rating,
        review,
      });
      res.status(200).json(newRatingReview);
    } catch (error) {
      console.error("Error adding rating/review:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async getRatingsReviewsByCourseId(req, res) {
    try {
      const courseId = req.params.courseId;
      const ratingsReviews = await RatingReview.find({ courseId: courseId });
      if (ratingsReviews.length === 0) {
        return res.status(404).json("No reviews found for this Course");
      }
      res.status(200).json({ data: ratingsReviews });
    } catch (error) {
      console.error("Error getting ratings/reviews for course:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async updateRatingReview(req, res) {
    try {
      const ratingId = req.params.id;
      const { rating, review } = req.body;
      console.log("ratingId", ratingId);
      let ratings = await RatingReview.findOne({ _id: ratingId });
      if (!ratings) {
        return res.status(404).json({
          status: 404,
          error: "Id not found",
        });
      }
      console.log("ratings", ratings);
      const updatedRatingReview = await RatingReview.findOneAndUpdate(
        { _id: ratingId },
        { rating, review },
        { new: true }
      );
      res
        .status(200)
        .json({ status: true, success: "Updated", data: updatedRatingReview });
    } catch (error) {
      console.error("Error updating rating/review:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async deleteRatingReview(req, res) {
    try {
      const _id = req.params.id;
      const findReviews = await RatingReview.findByIdAndDelete(_id);
      if (!findReviews) {
        return res
          .status(404)
          .json({ status: false, message: "Reviews not found" });
      }
      return res.status(200).json({ success: "Deleted" });
    } catch (error) {
      console.error("Error deleting rating/review:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}

const ratingreview = new RatingsAndReview();
module.exports = ratingreview;
