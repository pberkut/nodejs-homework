const { controllerWrapper, HttpError } = require('../../utils');
const userServices = require('../../services/users.service');

const verifyEmail = controllerWrapper(async (req, res) => {
  const { verificationToken } = req.params;
  const user = await userServices.getUserByVerificationToken(verificationToken);
  if (!user) throw new HttpError(404, 'User not found');

  await userServices.verifyEmail(user._id);

  res.json({ message: 'Verification successful' });
});

module.exports = verifyEmail;
