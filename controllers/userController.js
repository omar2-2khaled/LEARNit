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
exports.addToBookmarks = catchAsync(async (req, res, next) => {
    const course = await Course.findById(req.params.id);
    if (!course) {
        return next(new AppError("No course found with that ID", 404));
    }
    const userId = req.user.id;
    const user = await User.findById(userId);
    if (user.courses.includes(course.id)) {
        return next(new AppError("You are already enrolled", 500));
    }
    user.bookmarks.push(course);
    await user.save();

    res.status(200).json({
        status: 'success',
        data: {
            user
        }
    });
});
const filteredBody = function (obj, ...allowedFields) {
    const newObj = {};
    Object.keys(obj).forEach((ele) => {
        if (allowedFields.includes(ele)) newObj[ele] = obj[ele];
    });
    return newObj;
}

exports.getMe = catchAsync(async (req, res, next) => {
    req.params.id = req.user.id;
    next();
});

exports.updateMe = catchAsync(async (req, res, next) => {
    if (req.body.password || req.body.confirmPassword) {
        return next(
            new AppError(
                'this rout is not for updating password, please use updatePassword',
                400,
            ),
        );
    }
    const filerBody = filteredBody(req.params, 'name', 'email');
    const user = await User.findByIdAndUpdate(req.user.id, filerBody, {
        runValidators: true,
        new: true,
    });
    res.status(200).json({
        message: 'Successful update',
        data: {
            user,
        },
    });
});

exports.deleteMe = catchAsync(async (req, res, next) => {
    const user = await User.findByIdAndUpdate(req.user.id, { active: false });
    res.status(204).json({
        status: 'success',
        data: null,
    });
});