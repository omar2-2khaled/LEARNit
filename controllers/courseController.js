const apiFeatures = require("../utils/apiFeature");
const Course = require("../models/courseModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

exports.getAllCourses = catchAsync(async (req, res, next) => {
    const feature = new apiFeatures(Course.find(), req.query)
        .filtering()
        .sorting()
        .fieldLimit()
        .page();
    const courses = await feature.query;
    res.status(200).json({
        status: "success",
        results: courses.length,
        data: {
            courses,
        },
    });
});

exports.createCourse = catchAsync(async (req, res, next) => {
    const course = await Course.create(req.body);
    res.status(201).json({
        status: "Course created successfully",
        data: {
            course,
        },
    });
});

exports.getCourse = catchAsync(async (req, res, next) => {
    const course = await Course.findById(req.params.id);
    if (!course) {
        return next(new AppError("No course found with that ID", 404));
    }
    res.status(200).json({
        status: "success",
        data: {
            course,
        },
    });
});

exports.updateCourse = catchAsync(async (req, res, next) => {
    const course = await Course.findByIdAndUpdate(req.params.id, req.body, {
        runValidators: true,
        new: true,
    });
    if (!course) {
        return next(new AppError("No course found with that ID", 404));
    }
    res.status(200).json({
        status: "success",
        data: {
            course,
        },
    });
});
exports.deleteCourse = catchAsync(async (req, res, next) => {
    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) {
        return next(new AppError("No course found with that ID", 404));
    }
    res.status(204).json({
        status: "success",
        data: null,
    });
});
