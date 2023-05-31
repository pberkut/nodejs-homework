const { controllerWrapper } = require('../../utils');
const { getContactService } = require('../../services/contacts.service');

const getContactById = controllerWrapper(async (req, res) => {
  const { contactId } = req.params;
  const contact = await getContactService(contactId);
  return res.json(contact);
});

module.exports = getContactById;
