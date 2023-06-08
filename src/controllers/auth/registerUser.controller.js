const { controllerWrapper } = require('../../utils');
const { authService, emailService } = require('../../services');

const registerUser = controllerWrapper(async (req, res) => {
  const user = await authService.register(req.body);

  const { email, subscription, avatarURL, verificationToken } = user;

  await emailService.sendVerificationEmail(email, verificationToken);

  res.status(201).json({ user: { email, avatarURL, subscription } });
});

module.exports = registerUser;
