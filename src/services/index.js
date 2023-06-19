const { authServices } = require('./authServices');
const { emailServices } = require('./emailServices');
const { cloudServices } = require('./cloudServices');
const { contactsServices } = require('./contactsServices');
const { userServices } = require('./userServices');
const { tokenServices } = require('./tokenServices');
const { verifyServices } = require('./verifyServices');

module.exports = {
  authServices,
  emailServices,
  cloudServices,
  contactsServices,
  userServices,
  tokenServices,
  verifyServices,
};
