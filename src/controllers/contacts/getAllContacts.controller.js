const { controllerWrapper } = require('../../utils');
const { getContactsService } = require('../../services/contacts.service');

const getAllContacts = controllerWrapper(async (req, res) => {
  const { _id: owner } = req.user;
  const contacts = await getContactsService(owner, req.query);
  return res.json(contacts);
});

module.exports = getAllContacts;
