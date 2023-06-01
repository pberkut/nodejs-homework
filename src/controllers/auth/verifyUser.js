const { controllerWrapper, HttpError } = require('../../utils');
const userServices = require('../../services/users.service');

const verifyUser = controllerWrapper(async (req, res) => {
  const { verificationToken } = req.params;
  const verifiedUser = await userServices.getVerificationToken(
    verificationToken,
  );
  if (!verifiedUser) throw new HttpError(404, 'User not found');
});

module.exports = verifyUser;
