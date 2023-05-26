const { User } = require('../models');

const getUserByEmailService = async email => {
  return User.findOne({ email });
};

const getUserByIdService = async userId => {
  return User.findById(userId);
};

const registerUserService = async body => {
  const { email, subscription } = await User.create(body);
  return {
    user: {
      email,
      subscription,
    },
  };
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

const logoutUserService = async userId => {
  return User.findByIdAndUpdate(userId, { token: null });
};

const updateUserService = async (userId, body) => {
  const { email, subscription } = await User.findByIdAndUpdate(userId, body, {
    new: true,
    select: 'email subscription',
  });

  return { email, subscription };
};

module.exports = {
  getUserByIdService,
  registerUserService,
  loginUserService,
  getUserByEmailService,
  logoutUserService,
  updateUserService,
};
