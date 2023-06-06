const { controllerWrapper } = require('../../utils');
const { authService, emailService } = require('../../services');

const verifyEmail = controllerWrapper(async (req, res) => {
  const { verificationToken } = req.params;

  const user = await authService.verifyEmail(verificationToken);

  await emailService.sendSuccessVerificationEmail(user.email);

  res.json({ message: 'Verification successful' });
});

module.exports = verifyEmail;
