const bcrypt = require('bcrypt');

const { User } = require('../models');
const { getUserByEmail, createUser } = require('./user.service');
const { HttpError, assignTokens } = require('../utils');
const { updateRefreshToken } = require('./token.service');

const register = async body => {
  const { email, password } = body;

  const fetchedUser = await getUserByEmail(email);
  if (fetchedUser) {
    throw new HttpError(409, 'Email already in use');
  }

  const newUser = await createUser(email, password);

  return newUser;
};

const login = async body => {
  const { email, password } = body;

  const user = await getUserByEmail(email);
  if (!user) throw new HttpError(401, 'Email is wrong');

  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) throw new HttpError(401, 'Password is wrong');

  if (!user.verify) throw new HttpError(401, 'Email not verified');

  const { accessToken, refreshToken } = assignTokens(user);

  await updateRefreshToken(user._id, refreshToken);

  return {
    accessToken,
    user: {
      email,
      avatarURL: user.avatarURL,
      subscription: user.subscription,
    },
  };
};

const logout = async userId => {
  return User.findByIdAndUpdate(userId, { refreshToken: null });
};

module.exports = {
  register,
  login,
  logout,
};
