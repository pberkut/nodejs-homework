const bcrypt = require('bcrypt');
const gravatar = require('gravatar');
const { v4: uuidv4 } = require('uuid');

const { HttpError, controllerWrapper, sendEmail } = require('../../utils');

const userServices = require('../../services/users.service');

const { BCRYPT_SALT, BASE_URL } = process.env;

const registerUser = controllerWrapper(async (req, res) => {
  const { email, password } = req.body;
  const candidate = await userServices.getUserByEmail(email);
  if (candidate) {
    throw new HttpError(409, 'Email already in use');
  }

  const hashedPassword = await bcrypt.hash(password, parseInt(BCRYPT_SALT));
  const avatarURL = gravatar.url(email, { s: '250' }, true);
  const verificationToken = uuidv4();

  const newUser = await userServices.register({
    ...req.body,
    password: hashedPassword,
    avatarURL,
    verificationToken,
  });

  const verifyEmail = {
    to: email,
    subject: 'Verify email',
    html: `<a target="_blank" href="${BASE_URL}/users/verify/${verificationToken}">Click verify email</a>`,
  };

  await sendEmail(verifyEmail);

  res.status(201).json(newUser);
});

module.exports = registerUser;
