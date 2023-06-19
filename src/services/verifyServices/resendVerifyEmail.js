const { HttpError } = require('../../utils');
const { userServices } = require('../userServices');

const resendVerifyEmail = async email => {
  const user = await userServices.getUserByEmail(email);
  if (!user) throw new HttpError(401, 'Email not found');
  if (user.verify) throw new HttpError(400, 'Verification has already been passed');

  return user;
};

module.exports = resendVerifyEmail;
