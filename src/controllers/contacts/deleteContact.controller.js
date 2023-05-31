const { controllerWrapper } = require('../../utils');
const { deleteContactService } = require('../../services/contacts.service');

const deleteContact = controllerWrapper(async (req, res) => {
  const { contactId } = req.params;
  await deleteContactService(contactId);
  return res.json({ message: 'Contact deleted' });
});

module.exports = deleteContact;
