const { controllerWrapper } = require('../../utils');
const { userServices } = require('../../services');

const updateSubscriptionUser = controllerWrapper(async (req, res) => {
  const { _id: userId } = req.user;
  const data = req.body;

  const updateUser = await userServices.updateSubscription(userId, data);

  res.status(200).json(updateUser);
});

module.exports = updateSubscriptionUser;
