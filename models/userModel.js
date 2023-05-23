const { Schema, model } = require('mongoose');
const { handleMongooseError } = require('../decorators');

const subscriptionList = ['starter', 'pro', 'business'];
const emailRegexp = /\b[\w.-]+@[\w.-]+\.\w{2,4}\b/;
const passwordRegexp = /^(?=.*\d)(?=.*[a-zA-Z]).{6,}$/;

const userSchema = new Schema(
  {
    password: {
      type: String,
      minlength: 6,
      match: passwordRegexp,
      required: [true, 'Password is required'],
    },
    email: {
      type: String,
      match: emailRegexp,
      required: [true, 'Email is required'],
      unique: true,
    },
    subscription: {
      type: String,
      enum: subscriptionList,
      default: 'starter',
    },
    token: {
      type: String,
      default: null,
    },
  },
  { versionKey: false, timestamps: true },
);

userSchema.post('save', handleMongooseError);

const User = model('user', userSchema);

module.exports = User;
