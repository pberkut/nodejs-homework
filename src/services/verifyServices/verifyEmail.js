const { User } = require('../../models');

const { userServices } = require('../userServices');

const verifyEmail = async verificationToken => {
  const user = await userServices.getUserByVerificationToken(verificationToken);

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

module.exports = verifyEmail;
