const { User } = require('../models');

const getUserByEmailService = async email => {
  return User.findOne({ email });
};

const registerUserService = async body => {
  return User.create(body);
};

const loginUserService = async (userId, body) => {
  const { token, email, subscription } = await User.findByIdAndUpdate(
    { _id: userId },
    body,
    {
      new: true,
      select: 'email subscription token',
    },
  );
  return {
    token,
    user: {
      email,
      subscription,
    },
  };
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
