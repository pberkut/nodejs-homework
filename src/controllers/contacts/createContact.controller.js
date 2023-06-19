const { controllerWrapper } = require('../../utils');
const { contactsServices } = require('../../services');

const createContact = controllerWrapper(async (req, res) => {
  const { _id: owner } = req.user;
  const newContact = await contactsServices.createContact({
    ...req.body,
    owner,
  });
  return res.status(201).json(newContact);
});

module.exports = createContact;
