const getUserByEmail = require('./getUserByEmail');
const getUserById = require('./getUserById');
const getUserByVerificationToken = require('./getUserByVerificationToken');
const createUser = require('./createUser');
const updateSubscription = require('./updateSubscription');
const updateAvatar = require('./updateAvatar');
const getAvatar = require('./getAvatar');

module.exports.userServices = {
  getUserByEmail,
  getUserById,
  getUserByVerificationToken,
  createUser,
  updateSubscription,
  updateAvatar,
  getAvatar,
};
