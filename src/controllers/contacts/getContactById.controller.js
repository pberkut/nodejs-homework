const { controllerWrapper } = require('../../utils');
const { contactsServices } = require('../../services');

const getContactById = controllerWrapper(async (req, res) => {
  const { contactId } = req.params;
  const { id: userId } = req.user;

  const contact = await contactsServices.getContactById(userId, contactId);

  res.status(200).json(contact);
});

module.exports = getContactById;
