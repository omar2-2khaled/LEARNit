const User = require('../models/userModel');
const Course = require("../models/courseModel");
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.enroll = catchAsync(async (req, res, next) => {
    const course = await Course.findById(req.params.id);
    if (!course) {
        return next(new AppError("No course found with that ID", 404));
    }
    const userId = req.user.id;
    const user = await User.findById(userId);
    if (user.courses.includes(course.id)) {
        return next(new AppError("You are already enrolled", 500));
    }
    user.courses.push(course);
    await user.save();

    res.status(200).json({
        status: 'success',
        data: {
            user
        }
    });
});
exports.addToWishlist = catchAsync(async (req, res, next) => {
    const course = await Course.findById(req.params.id);
    if (!course) {
        return next(new AppError("No course found with that ID", 404));
    }
    const userId = req.user.id;
    const user = await User.findById(userId);
    if (user.courses.includes(course.id)) {
        return next(new AppError("You are already enrolled", 500));
    }
    user.wishlist.push(course);
    await user.save();

    res.status(200).json({
        status: 'success',
        data: {
            user
        }
    });
});