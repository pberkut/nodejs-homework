const { controllerWrapper, HttpError, sendEmail } = require('../../utils');
const userServices = require('../../services/users.service');

const { BASE_URL } = process.env;

const resendVerifyEmail = controllerWrapper(async (req, res) => {
  const { email } = req.body;
  const user = await userServices.getUserByEmail(email);
  if (!user) throw new HttpError(401, 'Email not found');
  if (user.verify)
    throw new HttpError(400, 'Verification has already been passed');

  const verifyEmail = {
    to: email,
    subject: 'Verify email',
    html: `<a target="_blank" href="${BASE_URL}/users/verify/${user.verificationToken}">Click verify email</a>`,
  };

  await sendEmail(verifyEmail);

  res.json({ message: 'Verify email send success' });
});

module.exports = resendVerifyEmail;
