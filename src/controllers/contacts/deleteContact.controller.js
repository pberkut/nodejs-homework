const { controllerWrapper } = require('../../utils');
const { contactsServices } = require('../../services');

const deleteContact = controllerWrapper(async (req, res) => {
  const { contactId } = req.params;
  await contactsServices.deleteContact(contactId);
  return res.json({ message: 'Contact deleted' });
});

module.exports = deleteContact;
