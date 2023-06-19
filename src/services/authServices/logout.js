const { User } = require('../../models');

const logout = async userId => {
  return User.findByIdAndUpdate(userId, { refreshToken: null });
};

module.exports = logout;
