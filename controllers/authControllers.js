const {
  registerUserService,
  loginUserService,
  getCurrentUserService,
  logoutUserService,
} = require('../services/usersServices');

const registerUser = async (req, res) => {
  const result = await registerUserService(req.body);
  res.status(201).json(result);
};

const loginUser = async (req, res) => {
  const result = await loginUserService();
  res.json(result);
};

const getCurrentUser = async (req, res) => {
  const result = await getCurrentUserService();
  return result;
};

const logoutUser = async (req, res) => {
  const result = await logoutUserService();
  return result;
};

module.exports = { registerUser, loginUser, getCurrentUser, logoutUser };
