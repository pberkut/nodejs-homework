const { controllerWrapper } = require('../../utils');
const { authServices } = require('../../services');

const logoutUser = controllerWrapper(async (req, res) => {
  const { _id } = req.user;
  await authServices.logout(_id);
  res.status(204).json();
});

module.exports = logoutUser;
