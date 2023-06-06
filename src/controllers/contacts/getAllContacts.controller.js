const { controllerWrapper } = require('../../utils');
const { contactsService } = require('../../services');

const getAllContacts = controllerWrapper(async (req, res) => {
  const { _id: owner } = req.user;
  const contacts = await contactsService.getAllContacts(owner, req.query);
  return res.json(contacts);
});

module.exports = getAllContacts;
