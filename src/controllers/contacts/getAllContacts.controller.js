const { controllerWrapper } = require('../../utils');
const { contactsServices } = require('../../services');

const getAllContacts = controllerWrapper(async (req, res) => {
  const { _id: userId } = req.user;
  const { page = 1, limit = 10, favorite } = req.query;

  const contacts = await contactsServices.getAllContacts(userId, page, limit, favorite);

  res.status(200).json(contacts);
});

module.exports = getAllContacts;
