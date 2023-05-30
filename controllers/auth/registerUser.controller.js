const bcrypt = require('bcrypt');
const gravatar = require('gravatar');
const { HttpError, controllerWrapper } = require('../../utils');

const userServices = require('../../services/users.services');

const { BCRYPT_SALT } = process.env;

const registerUser = controllerWrapper(async (req, res) => {
  const { email, password } = req.body;
  const candidate = await userServices.getUserByEmailService(email);
  if (candidate) {
    throw new HttpError(409, 'Email already in use');
  }

  const hashedPassword = await bcrypt.hash(password, parseInt(BCRYPT_SALT));
  const avatarURL = gravatar.url(email);

  const newUser = await userServices.register({
    ...req.body,
    password: hashedPassword,
    avatarURL,
  });

  res.status(201).json(newUser);
});

module.exports = registerUser;
