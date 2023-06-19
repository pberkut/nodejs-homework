const { User } = require('../../models');
const bcrypt = require('bcrypt');
const gravatar = require('gravatar');
const { v4: uuidv4 } = require('uuid');

const { BCRYPT_SALT } = process.env;

const createUser = async (email, password) => {
  const hashedPassword = await bcrypt.hash(password, parseInt(BCRYPT_SALT));
  const avatarURL = gravatar.url(email, { s: '250' }, true);
  const verificationToken = uuidv4();

  const newUser = await User.create({
    email,
    password: hashedPassword,
    avatarURL,
    verificationToken,
  });

  return newUser;
};

module.exports = createUser;
