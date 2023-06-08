const { controllerWrapper } = require('../../utils');
const { contactsService } = require('../../services');

const deleteContact = controllerWrapper(async (req, res) => {
  const { contactId } = req.params;
  await contactsService.deleteContact(contactId);
  return res.json({ message: 'Contact deleted' });
});

module.exports = deleteContact;
