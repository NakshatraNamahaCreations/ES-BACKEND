const express = require("express");
const router = express.Router();
const ratingsReviewsController = require("../../Controller/RatingReview/ratings-reviews");

router.post("/addratingsandreviews", ratingsReviewsController.addRatingReview);
router.get(
  "/getratingsandreviewsbycourseid/:courseId",
  ratingsReviewsController.getRatingsReviewsByCourseId
);
router.put(
  "/updateratingsandreviews/:id",
  ratingsReviewsController.updateRatingReview
);
router.delete(
  "/deleteratingsandreviews/:id",
  ratingsReviewsController.deleteRatingReview
);

module.exports = router;
