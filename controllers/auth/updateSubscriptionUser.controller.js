const { controllerWrapper } = require('../../utils');
const { updateUserService } = require('../../services/users.services');

const updateSubscriptionUser = controllerWrapper(async (req, res) => {
  const { _id } = req.user;
  const updateUser = await updateUserService(_id, req.body);
  res.status(200).json(updateUser);
});

module.exports = updateSubscriptionUser;
