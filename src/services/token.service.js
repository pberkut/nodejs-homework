const { User } = require('../models');

const updateRefreshToken = async (userId, refreshToken) => {
  return User.findByIdAndUpdate(userId, refreshToken);
};

module.exports = { updateRefreshToken };
