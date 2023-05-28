const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const gravatar = require('gravatar');
const fs = require('fs/promises');
const path = require('path');

const {
  getUserByEmailService,
  registerUserService,
  loginUserService,
  logoutUserService,
  updateUserService,
} = require('../services/users.services');

const { HttpError, controllerWrapper } = require('../utils');

const { BCRYPT_SALT } = process.env;
const { JWT_SECRET_KEY } = process.env;
const { JWT_EXPIRES_IN } = process.env;

const avatarsDir = path.join(__dirname, '../', 'public', 'avatars');

const registerUser = controllerWrapper(async (req, res) => {
  const { email, password } = req.body;
  const candidate = await getUserByEmailService(email);
  if (candidate) {
    throw new HttpError(409, 'Email already in use');
  }

  const hashedPassword = await bcrypt.hash(password, parseInt(BCRYPT_SALT));
  const avatarURL = gravatar.url(email);

  const newUser = await registerUserService({
    ...req.body,
    password: hashedPassword,
    avatarURL,
  });

  res.status(201).json(newUser);
});

const loginUser = controllerWrapper(async (req, res) => {
  const { email, password } = req.body;

  const user = await getUserByEmailService(email);
  if (!user) {
    throw new HttpError(401, 'Email or password is wrong');
  }
  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    throw new HttpError(401, 'Email or password is wrong');
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, JWT_SECRET_KEY, {
    expiresIn: JWT_EXPIRES_IN,
  });

  const userWithSavedToken = await loginUserService(user._id, { token });

  res.json(userWithSavedToken);
});

const getCurrentUser = controllerWrapper(async (req, res) => {
  const { email, subscription, avatarURL } = req.user;
  res.json({ email, avatarURL, subscription });
});

const logoutUser = controllerWrapper(async (req, res) => {
  const { _id } = req.user;
  await logoutUserService(_id);
  res.status(204).json();
});

const updateUser = controllerWrapper(async (req, res) => {
  const { _id } = req.user;
  const updateUser = await updateUserService(_id, req.body);
  res.status(200).json(updateUser);
});

const uploadAvatar = controllerWrapper(async (req, res) => {
  const { _id } = req.user;
  const { path: tempUploadPath, filename } = req.file;
  const avatarName = `${_id}_${filename}`;
  const resultUploadPath = path.join(avatarsDir, avatarName);

  await fs.rename(tempUploadPath, resultUploadPath);
  const avatarURL = path.join('avatars', avatarName);
  await updateUserService(_id, { avatarURL });

  res.json({ avatarURL });
});

module.exports = {
  registerUser,
  loginUser,
  getCurrentUser,
  logoutUser,
  updateUser,
  uploadAvatar,
};
