const Course = require("../models/courseModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

exports.createModule = catchAsync(async (req, res, next) => {
    const course = await Course.findById(req.params.courseId);
    if (!course) {
        return next(new AppError('No course found with that ID'), 404);
    }
    course.modules.push(req.body);
    course.save();
    res.status(201).json({
        message: 'module added successfully',
    })
});
exports.getAllModules = catchAsync(async (req, res, next) => {
    const course = await Course.findById(req.params.courseId);
    if (!course) {
        return next(new AppError("No course found with that ID", 404));
    }
    const modules = course.modules
    res.status(200).json({
        status: 'success',
        results: modules.length,
        data: {
            modules
        }
    });
});
exports.getModule = catchAsync(async (req, res, next) => {
    const course = await Course.findById(req.params.courseId);
    if (!course) {
        return next(new AppError("No course found with that ID", 404));
    }
    const module = course.modules.id(req.params.moduleId);
    if (!module) {
        return next(new AppError("No module found with that ID", 404));
    }
    res.status(200).json({
        data: module,
    });
});
exports.updateModule = catchAsync(async (req, res, next) => {
    const course = await Course.findById(req.params.courseId);
    if (!course) {
        return next(new AppError("No course found with that ID", 404));
    }
    const module = course.modules.id(req.params.moduleId);
    if (!module) {
        return next(new AppError("No module found with that ID", 404));
    }
    Object.assign(module, req.body);
    await course.save();
    res.status(200).json({
        message: 'Module updated successfully',
        data: module
    });
});

exports.deleteModule = catchAsync(async (req, res, next) => {
    const course = await Course.findById(req.params.courseId);
    if (!course) {
        return next(new AppError("No course found with that ID", 404));
    }
    const module = course.modules.id(req.params.moduleId);
    if (!module) {
        return next(new AppError("No module found with that ID", 404));
    }
    course.modules.pull(module);
    await course.save();
    res.status(200).json({
        message: 'Module deleted successfully'
    });
});