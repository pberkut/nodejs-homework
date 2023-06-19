const { authServices } = require('../../services');
const { controllerWrapper } = require('../../utils');

const loginUser = controllerWrapper(async (req, res) => {
  const { accessToken, user } = await authServices.login(req.body);

  res.status(200).json({ accessToken, user });
});

module.exports = loginUser;
