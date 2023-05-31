const { Schema, model } = require('mongoose');
const { handleMongooseError } = require('../utils');

const {
  EMAIL_REGEXP,
  PASSWORD_REGEXP,
  SUBSCRIPTION_LIST,
} = require('../libs/constants');

const userSchema = new Schema(
  {
    password: {
      type: String,
      match: PASSWORD_REGEXP,
      required: [true, 'Password is required'],
    },
    email: {
      type: String,
      match: EMAIL_REGEXP,
      required: [true, 'Email is required'],
      unique: true,
    },
    subscription: {
      type: String,
      enum: SUBSCRIPTION_LIST,
      default: 'starter',
    },
    avatarURL: {
      type: String,
      required: true,
    },
    idCloudAvatar: { type: String, default: null },
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
