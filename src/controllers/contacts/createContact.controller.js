const { controllerWrapper } = require('../../utils');
const { contactsService } = require('../../services');

const createContact = controllerWrapper(async (req, res) => {
  const { _id: owner } = req.user;
  const newContact = await contactsService.createContact({
    ...req.body,
    owner,
  });
  return res.status(201).json(newContact);
});

module.exports = createContact;
