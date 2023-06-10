const { controllerWrapper } = require('../../utils');
const { userService } = require('../../services');

const updateSubscriptionUser = controllerWrapper(async (req, res) => {
  const { _id } = req.user;
  const updateUser = await userService.updateSubscription(_id, req.body);
  res.status(200).json(updateUser);
});

module.exports = updateSubscriptionUser;
