const { controllerWrapper } = require('../../utils');
const { updateContactService } = require('../../services/contacts.service');

const updateContact = controllerWrapper(async (req, res) => {
  const { contactId } = req.params;
  const updateContact = await updateContactService(contactId, req.body);
  res.json(updateContact);
});

module.exports = updateContact;
