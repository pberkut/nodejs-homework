const bcrypt = require('bcrypt');

const { userServices } = require('../userServices');
const { tokenServices } = require('../tokenServices');
const { HttpError, assignTokens } = require('../../utils');

const login = async body => {
  const { email, password } = body;

  const user = await userServices.getUserByEmail(email);
  if (!user) throw new HttpError(401, 'Email is wrong');

  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) throw new HttpError(401, 'Password is wrong');

  if (!user.verify) throw new HttpError(401, 'Email not verified');

  const { accessToken, refreshToken } = assignTokens(user);

  await tokenServices.updateRefreshToken(user._id, refreshToken);

  return {
    accessToken,
    user: {
      email,
      avatarURL: user.avatarURL,
      subscription: user.subscription,
    },
  };
};

module.exports = login;
