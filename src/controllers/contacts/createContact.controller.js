const { controllerWrapper } = require('../../utils');
const { createContactService } = require('../../services/contacts.service');

const createContact = controllerWrapper(async (req, res) => {
  const { _id: owner } = req.user;
  const newContact = await createContactService({ ...req.body, owner });
  return res.status(201).json(newContact);
});

module.exports = createContact;
