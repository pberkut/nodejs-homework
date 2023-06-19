const { controllerWrapper } = require('../../utils');
const { verifyServices, emailServices } = require('../../services');

const resendVerifyEmail = controllerWrapper(async (req, res) => {
  const { email } = req.body;

  const user = await verifyServices.resendVerifyEmail(email);

  await emailServices.sendVerificationEmail(email, user.verificationToken);

  res.json({ message: 'Verify email send success' });
});

module.exports = resendVerifyEmail;
