const { User } = require('../models');

const getUserByEmailService = async email => {
  return User.findOne({ email });
};

const registerUserService = async body => {
  return User.create(body);
};

const loginUserService = async () => {
  return User.findOne;
};

const getCurrentUserService = async userId => {
  return User.findById(userId);
};

const logoutUserService = async () => {};

module.exports = {
  getUserByEmailService,
  registerUserService,
  loginUserService,
  getCurrentUserService,
  logoutUserService,
};
