const { User } = require('../models');

const getUserByEmail = async email => {
  return User.findOne({ email });
};

const getUserById = async userId => {
  return User.findById(userId);
};

const register = async body => {
  const { email, subscription } = await User.create(body);
  return {
    user: {
      email,
      subscription,
    },
  };
};

const login = async (userId, body) => {
  const { token, email, avatarURL, subscription } =
    await User.findByIdAndUpdate({ _id: userId }, body, {
      new: true,
      select: 'email subscription avatarURL token',
    });
  return {
    token,
    user: {
      email,
      avatarURL,
      subscription,
    },
  };
};

const logout = async userId => {
  return User.findByIdAndUpdate(userId, { token: null });
};

const updateSubscription = async (userId, body) => {
  const { email, subscription } = await User.findByIdAndUpdate(userId, body, {
    new: true,
    select: 'email subscription',
  });

  return { email, subscription };
};

const updateAvatar = async (userId, newAvatarURL) => {
  const { avatarURL } = await User.findByIdAndUpdate(userId, newAvatarURL, {
    new: true,
    select: 'avatarURL',
  });

  return { avatarURL };
};

const userServices = {
  getUserById,
  getUserByEmail,
  register,
  login,
  updateSubscription,
  updateAvatar,
  logout,
};

module.exports = userServices;
