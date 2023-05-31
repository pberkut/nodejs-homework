const { controllerWrapper } = require('../../utils');
const userServices = require('../../services/users.service');

const logoutUser = controllerWrapper(async (req, res) => {
  const { _id } = req.user;
  await userServices.logout(_id);
  res.status(204).json();
});

module.exports = logoutUser;
