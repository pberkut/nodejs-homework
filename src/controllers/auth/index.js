const registerUser = require('./registerUser.controller');
const loginUser = require('./loginUser.controller');
const getCurrentUser = require('./getCurrentUser.controller');
const updateSubscriptionUser = require('./updateSubscriptionUser.controller');
const uploadAvatarUser = require('./uploadAvatarUser.controller');
const logoutUser = require('./logoutUser.controller');

module.exports = {
  registerUser,
  loginUser,
  getCurrentUser,
  updateSubscriptionUser,
  uploadAvatarUser,
  logoutUser,
};
