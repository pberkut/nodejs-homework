const { controllerWrapper } = require('../../utils');
const { contactsServices } = require('../../services');

const updateContact = controllerWrapper(async (req, res) => {
  const { contactId } = req.params;

  const updateContact = await contactsServices.updateContact(contactId, req.body);

  res.status(200).json(updateContact);
});

module.exports = updateContact;
