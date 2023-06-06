const { controllerWrapper } = require('../../utils');
const { contactsService } = require('../../services');

const getContactById = controllerWrapper(async (req, res) => {
  const { contactId } = req.params;
  const contact = await contactsService.getContact(contactId);
  return res.json(contact);
});

module.exports = getContactById;
