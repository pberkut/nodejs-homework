const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const {
  getUserByEmailService,
  registerUserService,
  loginUserService,
  logoutUserService,
} = require('../services/usersServices');

const { HttpError, controllerWrapper } = require('../helpers');

const { BCRYPT_SALT } = process.env;
const { JWT_SECRET_KEY } = process.env;

const registerUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await getUserByEmailService(email);
  if (user) {
    throw HttpError(409, 'Email already in use');
  }

  const hashPassword = await bcrypt.hash(password, parseInt(BCRYPT_SALT));

  const newUser = await registerUserService({
    ...req.body,
    password: hashPassword,
  });

  res.status(201).json(newUser);
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await getUserByEmailService(email);
  if (!user) {
    throw HttpError(401, 'Email or password is wrong');
  }
  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, 'Email or password is wrong');
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: '23h' });

  const userWithSavedToken = await loginUserService(user._id, { token });

  res.json(userWithSavedToken);
};

const getCurrentUser = async (req, res) => {
  const { email, subscription } = req.user;
  res.json({ email, subscription });
};

const logoutUser = async (req, res) => {
  const { _id } = req.user;
  await logoutUserService(_id);
  res.status(204).json();
};

module.exports = {
  registerUser: controllerWrapper(registerUser),
  loginUser: controllerWrapper(loginUser),
  getCurrentUser: controllerWrapper(getCurrentUser),
  logoutUser: controllerWrapper(logoutUser),
};
