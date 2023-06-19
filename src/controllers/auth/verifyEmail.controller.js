const { controllerWrapper } = require('../../utils');
const { verifyServices, emailServices } = require('../../services');

const verifyEmail = controllerWrapper(async (req, res) => {
  const { verificationToken } = req.params;

  const user = await verifyServices.verifyEmail(verificationToken);

  await emailServices.sendSuccessVerificationEmail(user.email);

  res.json({ message: 'Verification successful' });
});

module.exports = verifyEmail;
