const { User } = require('../models');
const {
  getUserByEmail,
  getUserByVerificationToken,
} = require('./user.service');
const { HttpError } = require('../utils');

const verifyEmail = async verificationToken => {
  const user = await getUserByVerificationToken(verificationToken);

  await User.findByIdAndUpdate(
    user._id,
    {
      verify: true,
      verificationToken: null,
    },
    { new: true },
  );

  return user;
};

const resendVerifyEmail = async email => {
  const user = await getUserByEmail(email);
  if (!user) throw new HttpError(401, 'Email not found');
  if (user.verify)
    throw new HttpError(400, 'Verification has already been passed');

  return user;
};

module.exports = { verifyEmail, resendVerifyEmail };
