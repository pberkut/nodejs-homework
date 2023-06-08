const { controllerWrapper } = require('../../utils');
const { authService } = require('../../services');

const updateSubscriptionUser = controllerWrapper(async (req, res) => {
  const { _id } = req.user;
  const updateUser = await authService.updateSubscription(_id, req.body);
  res.status(200).json(updateUser);
});

module.exports = updateSubscriptionUser;
