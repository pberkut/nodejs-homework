const { User } = require('../../models');

const getUserById = async userId => {
  return User.findById(userId);
};

module.exports = getUserById;
