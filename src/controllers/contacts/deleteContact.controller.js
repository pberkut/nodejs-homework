const { controllerWrapper } = require('../../utils');
const { contactsServices } = require('../../services');

const deleteContact = controllerWrapper(async (req, res) => {
  const { contactId } = req.params;
  const { id: userId } = req.userId;

  await contactsServices.deleteContact(userId, contactId);

  res.status(200).json({ message: 'Contact deleted' });
});

module.exports = deleteContact;
