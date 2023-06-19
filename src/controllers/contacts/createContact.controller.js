const { controllerWrapper } = require('../../utils');
const { contactsServices } = require('../../services');

const createContact = controllerWrapper(async (req, res) => {
  const { _id: userId } = req.user;
  const data = req.body;

  const newContact = await contactsServices.createContact(userId, data);

  res.status(201).json(newContact);
});

module.exports = createContact;
