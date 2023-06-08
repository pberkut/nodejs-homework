const { controllerWrapper } = require('../../utils');
const { verifyService, emailService } = require('../../services');

const verifyEmail = controllerWrapper(async (req, res) => {
  const { verificationToken } = req.params;

  const user = await verifyService.verifyEmail(verificationToken);

  await emailService.sendSuccessVerificationEmail(user.email);

  res.json({ message: 'Verification successful' });
});

module.exports = verifyEmail;
