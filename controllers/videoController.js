const Course = require("../models/courseModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

exports.addVideo = catchAsync(async (req, res, next) => {
    const course = await Course.findById(req.params.courseId);
    if (!course) {
        return next(new AppError("No course found with that ID", 404));
    }
    const module = course.modules.id(req.params.moduleId);
    if (!module) {
        return next(new AppError("No module found with that ID", 404));
    }
    module.videos.push(req.body);
    await course.save();
    res.status(200).json({
        message: 'Video added successfully',
        data: module.videos
    });
});
exports.getALlVids = catchAsync(async (req, res, next) => {
    const course = await Course.findById(req.params.courseId);
    if (!course) {
        return next(new AppError("No course found with that ID", 404));
    }
    const module = course.modules.id(req.params.moduleId);
    if (!module) {
        return next(new AppError("No module found with that ID", 404));
    }
    const vids = module.videos;
    res.status(200).json({
        message: 'Video updated successfully',
        data: vids,
    });
});
exports.getVideo = catchAsync(async (req, res, next) => {
    const course = await Course.findById(req.params.courseId);
    if (!course) {
        return next(new AppError("No course found with that ID", 404));
    }
    const module = course.modules.id(req.params.moduleId);
    if (!module) {
        return next(new AppError("No module found with that ID", 404));
    }
    const video = module.videos.id(req.params.videoId);
    if (!video) {
        return next(new AppError("No video found with that ID", 404));
    }
    res.status(200).json({
        message: 'Video added successfully',
        data: video
    });
});
exports.editVideo = catchAsync(async (req, res, next) => {
    const course = await Course.findById(req.params.courseId);
    if (!course) {
        return next(new AppError("No course found with that ID", 404));
    }
    const module = course.modules.id(req.params.moduleId);
    if (!module) {
        return next(new AppError("No module found with that ID", 404));
    }
    const video = module.videos.id(req.params.videoId);
    if (!video) {
        return next(new AppError("No video found with that ID", 404));
    }
    video.set(req.body);
    await course.save();
    res.status(200).json({
        message: 'Video updated successfully',
        data: video
    });
});
exports.deleteVideo = catchAsync(async (req, res, next) => {
    const course = await Course.findById(req.params.courseId);
    if (!course) {
        return next(new AppError("No course found with that ID", 404));
    }
    const module = course.modules.id(req.params.moduleId);
    if (!module) {
        return next(new AppError("No module found with that ID", 404));
    }
    const video = module.videos.id(req.params.videoId);
    if (!video) {
        return next(new AppError("No video found with that ID", 404));
    }
    module.videos.pull(video);
    await course.save();
    res.status(200).json({
        message: 'Video deleted successfully'
    });
});