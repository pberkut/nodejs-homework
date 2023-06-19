const { controllerWrapper } = require('../../utils');
const { contactsServices } = require('../../services');

const getContactById = controllerWrapper(async (req, res) => {
  const { contactId } = req.params;
  const contact = await contactsServices.getContactById(contactId);
  return res.json(contact);
});

module.exports = getContactById;
