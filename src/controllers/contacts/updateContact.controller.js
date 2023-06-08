const { controllerWrapper } = require('../../utils');
const { contactsService } = require('../../services');

const updateContact = controllerWrapper(async (req, res) => {
  const { contactId } = req.params;
  const updateContact = await contactsService.updateContact(contactId, req.body);
  res.json(updateContact);
});

module.exports = updateContact;
