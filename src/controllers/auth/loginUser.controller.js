const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userServices = require('../../services/users.service');
const { HttpError, controllerWrapper } = require('../../utils');

const { JWT_SECRET_KEY } = process.env;
const { JWT_EXPIRES_IN } = process.env;

const loginUser = controllerWrapper(async (req, res) => {
  const { email, password } = req.body;

  const user = await userServices.getUserByEmail(email);
  if (!user) {
    throw new HttpError(401, 'Email or password is wrong');
  }
  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    throw new HttpError(401, 'Email or password is wrong');
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, JWT_SECRET_KEY, {
    expiresIn: JWT_EXPIRES_IN,
  });

  const userWithSavedToken = await userServices.login(user._id, {
    token,
  });

  res.json(userWithSavedToken);
});

module.exports = loginUser;
