const { controllerWrapper } = require('../../utils');
const { authService } = require('../../services');

const logoutUser = controllerWrapper(async (req, res) => {
  const { _id } = req.user;
  await authService.logout(_id);
  res.status(204).json();
});

module.exports = logoutUser;
