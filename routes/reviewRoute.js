const express = require('express');
const auth = require('../auth/authController');
const reviewController = require('../controllers/reviewController');

const router = express.Router();

router.use(auth.protect);

router.route('/')
    .get(reviewController.getAllReviews)
    .post(auth.restrictedTo('user', 'admin'), reviewController.SetReviewToCourseAndUser, reviewController.createReviews)

router.route('/:id')
    .get(reviewController.getReview)
    .patch(reviewController.updateReviews)
    .delete(reviewController.deleteReviews)

module.exports = router;