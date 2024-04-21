const Review = require('../models/reviewModel');
const AppError = require('../utils/appError');
const catchAsync = require("../utils/catchAsync");
exports.SetReviewToCourseAndUser = (req, res, next) => {
    if (!req.body.course) req.body.course = req.params.course;
    if (!req.body.user) req.body.user = req.user.id;
    next();
}
exports.getAllReviews = catchAsync(async (req, res, next) => {
    const reviews = await Review.find();
    res.status(200).json({
        status: 'success',
        results: reviews.length,
        data: reviews,
    });

});
exports.getReview = catchAsync(async (req, res, next) => {
    const review = await Review.findById(req.params.id);
    if (!review) {
        return next(new AppError('no review found', 404));
    }
    res.status(200).json({
        status: 'success',
        data: review,
    });
});
exports.createReviews = catchAsync(async (req, res, next) => {
    const review = await Review.create(req.body);
    res.status(200).json({
        status: 'success',
        data: review,
    });
});
exports.deleteReviews = catchAsync(async (req, res, next) => {
    const review = await Review.findByIdAndDelete(req.params.id);
    if (!review) {
        return next(new AppError('no review found', 404));
    }
    res.status(200).json({
        status: 'success',
        data: null,
    });
});
exports.updateReviews = catchAsync(async (req, res, next) => {
    const review = await Review.findByIdAndUpdate(req.params.id, req.body, {
        runValidators: true,
        new: true,
    });
    if (!review) {
        return next(new AppError('no review found', 404));
    }
    res.status(200).json({
        status: 'success',
        data: review,
    });
});
