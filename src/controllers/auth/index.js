const registerUser = require('./registerUser.controller');
const loginUser = require('./loginUser.controller');
const verifyEmail = require('./verifyEmail.controller');
const resendVerifyEmail = require('./resendVerifyEmail.controller');
const getCurrentUser = require('./getCurrentUser.controller');
const updateSubscriptionUser = require('./updateSubscriptionUser.controller');
const uploadAvatarUser = require('./uploadAvatarUser.controller');
const logoutUser = require('./logoutUser.controller');

module.exports = {
  registerUser,
  verifyEmail,
  resendVerifyEmail,
  loginUser,
  getCurrentUser,
  updateSubscriptionUser,
  uploadAvatarUser,
  logoutUser,
};
