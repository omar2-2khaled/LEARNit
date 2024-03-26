const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please Enter your Name'],
    maxlength: [10, 'The max name size is 10 characters.'],
    minlength: [4, 'The min name size is 4 characters.'],
  },
  email: {
    type: String,
    required: [true, 'Please Enter your Email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'please Enter a valid email address'],
  },
  photo: String,
  password: {
    type: String,
    required: [true, 'please Enter the password'],
    unique: true,
    select: false,
  },
  confirmPassword: {
    type: String,
    required: function () { return this.isNew; },
    validate: {
      validator: function (ele) {
        return ele === this.password;
      },
      select: false,
      message: 'Passwords are not the same',
    },
  },
  role: {
    type: String,
    enum: ['user', 'instructor', 'admin'],
    default: 'user',
  },
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
  courses: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Course',
    }
  ],
  changePasswordAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,


});
userSchema.pre('save', function (next) {
  if (!this.isModified('password') || this.isNew) return next();
  this.changePasswordAt = Date.now() - 1000;
  next();
});
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.confirmPassword = undefined;
  next();
});
userSchema.pre('/^find/', function (next) {
  this.find({ active: { $ne: false } });
  next();
});
userSchema.methods.correctPassword = async function (candidatePassword, userPassword) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.passwordChanged = function (tokenTimeStamp) {
  if (this.changePasswordAt) {
    const changed = Math.floor(this.changePasswordAt.getTime() / 1000);
    return changed > tokenTimeStamp;
  }
  return false;
};

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');
  this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
  return resetToken;
};

const User = mongoose.model('User', userSchema);
module.exports = User;