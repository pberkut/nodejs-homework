const { controllerWrapper } = require('../../utils');
const userServices = require('../../services/users.service');

const updateSubscriptionUser = controllerWrapper(async (req, res) => {
  const { _id } = req.user;
  const updateUser = await userServices.updateSubscription(_id, req.body);
  res.status(200).json(updateUser);
});

module.exports = updateSubscriptionUser;
