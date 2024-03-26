const Category = require('../models/categoryModel');
const Course = require('../models/courseModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.createCategory = catchAsync(async (req, res, next) => {
    const newCategory = await Category.create(req.body);
    res.status(201).json({
        status: 'Category Created Successfully',
        data: {
            category: newCategory
        },
    });
});

exports.getAllCategories = catchAsync(async (req, res, next) => {
    const categories = await Category.find();
    res.status(200).json({
        status: 'Successful',
        results: categories.length,
        data: {
            categories,
        },
    });
});

exports.getCategory = catchAsync(async (req, res, next) => {
    const category = await Category.findById(req.params.id);
    if (!category) {
        return next(new AppError('Category Not Found', 404));
    }
    res.status(200).json({
        status: 'Successful',
        data: {
            category,
        },
    });
});

exports.updateCategory = async (req, res) => {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });
    if (!category) {
        return next(new AppError('Category Not Found', 404));
    }
    res.status(200).json({
        status: 'success',
        data: {
            category
        }
    });
};

exports.deleteCategory = async (req, res) => {
    await Category.findByIdAndDelete(req.params.id);
    res.status(204).json({
        status: 'success',
        data: null
    });
};

exports.getCoursesInCategory = async (req, res) => {
    const courses = await Course.find({ category: req.params.categoryId });
    res.status(200).json({
        status: 'success',
        results: courses.length,
        data: {
            courses
        }
    });
};