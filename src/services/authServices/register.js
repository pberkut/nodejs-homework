const { userServices } = require('../userServices');
const { HttpError } = require('../../utils');

const register = async body => {
  const { email, password } = body;

  const fetchedUser = await userServices.getUserByEmail(email);
  if (fetchedUser) {
    throw new HttpError(409, 'Email already in use');
  }

  const newUser = await userServices.createUser(email, password);

  return newUser;
};

module.exports = register;
