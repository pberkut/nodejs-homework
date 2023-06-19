const { controllerWrapper } = require('../../utils');

const getCurrentUser = controllerWrapper(async (req, res) => {
  const { email, subscription, avatarURL } = req.user;

  res.status(200).json({ email, avatarURL, subscription });
});

module.exports = getCurrentUser;
