const { controllerWrapper } = require('../../utils');
const { authServices } = require('../../services');

const logoutUser = controllerWrapper(async (req, res) => {
  const { _id: userId } = req.user;

  await authServices.logout(userId);

  res.status(204).json();
});

module.exports = logoutUser;
