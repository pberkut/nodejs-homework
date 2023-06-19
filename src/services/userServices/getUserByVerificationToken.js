const { User } = require('../../models');
const { HttpError } = require('../../utils');

const getUserByVerificationToken = async verificationToken => {
  const fetchedUser = await User.findOne({ verificationToken });
  if (!fetchedUser) throw new HttpError(404, 'User not found');
  return fetchedUser;
};

module.exports = getUserByVerificationToken;
