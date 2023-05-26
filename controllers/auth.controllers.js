const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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

const registerUser = controllerWrapper(async (req, res) => {
  const { email, password } = req.body;
  const candidate = await getUserByEmailService(email);
  if (candidate) {
    throw new HttpError(409, 'Email already in use');
  }

  const hashedPassword = await bcrypt.hash(password, parseInt(BCRYPT_SALT));

  const newUser = await registerUserService({
    ...req.body,
    password: hashedPassword,
  });

  res.status(201).json(newUser);
});

const loginUser = controllerWrapper(async (req, res) => {
  const { email, password } = req.body;

  const user = await getUserByEmailService(email);
  if (!user) {
    throw new HttpError(401, 'Email or password is wrong');
  }
  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw new HttpError(401, 'Email or password is wrong');
  }

  const payload = {
    id: user._id,
  };

  console.log(JWT_EXPIRES_IN);

  const token = jwt.sign(payload, JWT_SECRET_KEY, {
    expiresIn: JWT_EXPIRES_IN,
  });

  const userWithSavedToken = await loginUserService(user._id, { token });

  res.json(userWithSavedToken);
});

const getCurrentUser = controllerWrapper(async (req, res) => {
  const { email, subscription } = req.user;
  res.json({ email, subscription });
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

module.exports = {
  registerUser,
  loginUser,
  getCurrentUser,
  logoutUser,
  updateUser,
};
