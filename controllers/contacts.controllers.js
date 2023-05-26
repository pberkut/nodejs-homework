const {
  getContactsService,
  getContactService,
  createContactService,
  updateContactService,
  deleteContactService,
} = require('../services/contacts.services');

const { controllerWrapper } = require('../utils');

const getContacts = controllerWrapper(async (req, res) => {
  const { _id: owner } = req.user;
  const contacts = await getContactsService(owner, req.query);
  return res.json(contacts);
});

const getContact = controllerWrapper(async (req, res) => {
  const { contactId } = req.params;
  const contact = await getContactService(contactId);
  return res.json(contact);
});

const createContact = controllerWrapper(async (req, res) => {
  const { _id: owner } = req.user;
  const newContact = await createContactService({ ...req.body, owner });
  return res.status(201).json(newContact);
});

const updateContact = controllerWrapper(async (req, res) => {
  const { contactId } = req.params;
  const updateContact = await updateContactService(contactId, req.body);
  res.json(updateContact);
});

const deleteContact = controllerWrapper(async (req, res) => {
  const { contactId } = req.params;
  await deleteContactService(contactId);
  return res.json({ message: 'Contact deleted' });
});

module.exports = {
  getContacts,
  getContact,
  createContact,
  updateContact,
  deleteContact,
};
