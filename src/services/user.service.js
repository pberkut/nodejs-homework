const bcrypt = require('bcrypt');
const gravatar = require('gravatar');
const { v4: uuidv4 } = require('uuid');

const { User } = require('../models');
const { HttpError } = require('../utils');

const { BCRYPT_SALT } = process.env;

const getUserByEmail = async email => {
  return User.findOne({ email });
};

const getUserById = async userId => {
  return User.findById(userId);
};

const getUserByVerificationToken = async verificationToken => {
  const fetchedUser = await User.findOne({ verificationToken });
  if (!fetchedUser) throw new HttpError(404, 'User not found');
  return fetchedUser;
};

const createUser = async (email, password) => {
  const hashedPassword = await bcrypt.hash(password, parseInt(BCRYPT_SALT));
  const avatarURL = gravatar.url(email, { s: '250' }, true);
  const verificationToken = uuidv4();

  const newUser = await User.create({
    email,
    password: hashedPassword,
    avatarURL,
    verificationToken,
  });

  return newUser;
};

const updateSubscription = async (userId, body) => {
  const { email, subscription } = await User.findByIdAndUpdate(userId, body, {
    new: true,
    select: 'email subscription',
  });
  return { email, subscription };
};

const updateAvatar = async (userId, newAvatarURL, newIdCloudAvatar) => {
  const { avatarURL, idCloudAvatar } = await User.findByIdAndUpdate(
    userId,
    { avatarURL: newAvatarURL, idCloudAvatar: newIdCloudAvatar },
    {
      new: true,
      select: 'avatarURL, idCloudAvatar',
    },
  );
  return { avatarURL, idCloudAvatar };
};

const getAvatar = async userId => {
  const { avatarURL, idCloudAvatar } = await User.findById(userId);
  return { avatarURL, idCloudAvatar };
};

module.exports = {
  getUserByEmail,
  getUserById,
  getUserByVerificationToken,
  createUser,
  updateSubscription,
  updateAvatar,
  getAvatar,
};
