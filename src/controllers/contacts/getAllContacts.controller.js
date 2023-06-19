const { controllerWrapper } = require('../../utils');
const { contactsServices } = require('../../services');

const getAllContacts = controllerWrapper(async (req, res) => {
  const { _id: owner } = req.user;
  const contacts = await contactsServices.getAllContacts(owner, req.query);
  return res.json(contacts);
});

module.exports = getAllContacts;
