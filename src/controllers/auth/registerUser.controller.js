const { controllerWrapper } = require('../../utils');
const { authServices, emailServices } = require('../../services');

const registerUser = controllerWrapper(async (req, res) => {
  const user = await authServices.register(req.body);

  const { email, subscription, avatarURL, verificationToken } = user;

  await emailServices.sendVerificationEmail(email, verificationToken);

  res.status(201).json({ user: { email, avatarURL, subscription } });
});

module.exports = registerUser;
