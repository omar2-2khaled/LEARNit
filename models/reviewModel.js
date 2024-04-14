const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    review: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    course: {
        type: mongoose.Schema.ObjectId,
        ref: 'Course'
    },
    date: {
        type: Date,
        default: Date.now(),
    }

});

const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;
