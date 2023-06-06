const { controllerWrapper } = require('../../utils');
const { authService, emailService } = require('../../services');

const resendVerifyEmail = controllerWrapper(async (req, res) => {
  const { email } = req.body;

  const user = await authService.resendVerifyEmail(email);

  await emailService.sendVerificationEmail(email, user.verificationToken);

  res.json({ message: 'Verify email send success' });
});

module.exports = resendVerifyEmail;
