const { User } = require('../models');

const registerUserService = async data => {
  return User.create(data);
};

const loginUserService = async () => {};

const getCurrentUserService = async userId => {
  return User.findById(userId);
};

const logoutUserService = async () => {};

module.exports = {
  registerUserService,
  loginUserService,
  getCurrentUserService,
  logoutUserService,
};
