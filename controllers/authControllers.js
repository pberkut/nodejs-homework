const bcrypt = require('bcrypt');

const {
  getUserByEmailService,
  registerUserService,
  loginUserService,
  getCurrentUserService,
  logoutUserService,
} = require('../services/usersServices');

const { HttpError } = require('../helpers');
const { controllerWrapper } = require('../decorators');

const registerUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await getUserByEmailService(email);
  if (user) {
    throw HttpError(409, 'Email already in use');
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = await registerUserService({
    ...req.body,
    password: hashPassword,
  });

  res.status(201).json(newUser);
};

const loginUser = async (req, res) => {
  const user = await loginUserService();
  res.json(user);
};

const getCurrentUser = async (req, res) => {
  const user = await getCurrentUserService();
  return user;
};

const logoutUser = async (req, res) => {
  const user = await logoutUserService();
  return user;
};

module.exports = {
  registerUser: controllerWrapper(registerUser),
  loginUser: controllerWrapper(loginUser),
  getCurrentUser: controllerWrapper(getCurrentUser),
  logoutUser: controllerWrapper(logoutUser),
};
