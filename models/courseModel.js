const mongoose = require('mongoose');

const validator = require('validator');

function arrayLimit(val) {
  return val.length > 0;
}
const videoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    trim: true,
    required: [true, 'A video must have a description'],
  }
});
const moduleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  videos: [videoSchema],
});
const courseSchema = new mongoose.Schema({
  instructor: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  category: {
    type: mongoose.Schema.ObjectId,
    ref: 'Category',
  },
  rating: {
    type: Number,
    default: 4.5,
    min: [0, 'Rating must be above 0'],
    max: [5, 'Rating must be below 5']
  },
  ratingsAverage: {
    type: Number,
    default: 4.5,
    min: [0, 'Rating must be above 0'],
    max: [5, 'Rating must be below 5'],
    set: val => Math.round(val * 10) / 10,
  },
  ratingsQuantity: {
    type: Number,
    default: 0,
  },
  modules: {
    type: [moduleSchema],
    validate: [arrayLimit, '{PATH} needs at least 1 video.']
  },
  name: {
    type: String,
    required: [true, 'A Course must have a name'],
    unique: true,
    maxlength: [100, 'A Course name must have less than or equal 100 chars'],
    minlength: [20, 'A Course name must have more than or equal 30 chars'],
  },

  price: {
    type: Number,
    required: [true, 'A Course must have a price'],
  },
  about: {
    type: String,
    trim: true,
    required: [true, 'A Course must have a description'],
  },
  imageCover: {
    type: String,
    trim: true,
    required: [true, 'A Course must have a cover image'],
  },
  reviews: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Review'
    }
  ]
},
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Course = mongoose.model('Model', courseSchema);

module.exports = Course;