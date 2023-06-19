const { userServices } = require('../userServices');
const { HttpError } = require('../../utils');

const register = async body => {
  const { email, password } = body;

  const userExist = await userServices.getUserByEmail(email);
  if (userExist) {
    throw new HttpError(409, 'Email is already used');
  }

  const newUser = await userServices.createUser(email, password);

  return newUser;
};

module.exports = register;
