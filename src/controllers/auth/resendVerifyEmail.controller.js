const { controllerWrapper } = require('../../utils');
const { verifyService, emailService } = require('../../services');

const resendVerifyEmail = controllerWrapper(async (req, res) => {
  const { email } = req.body;

  const user = await verifyService.resendVerifyEmail(email);

  await emailService.sendVerificationEmail(email, user.verificationToken);

  res.json({ message: 'Verify email send success' });
});

module.exports = resendVerifyEmail;
