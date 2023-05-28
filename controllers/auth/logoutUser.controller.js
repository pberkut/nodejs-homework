const { controllerWrapper } = require('../../utils');
const { logoutUserService } = require('../../services/users.services');

const logoutUser = controllerWrapper(async (req, res) => {
  const { _id } = req.user;
  await logoutUserService(_id);
  res.status(204).json();
});

module.exports = logoutUser;
