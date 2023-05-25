const {
  getContactsService,
  getContactService,
  createContactService,
  updateContactService,
  deleteContactService,
} = require('../services/contacts-services');

const { controllerWrapper } = require('../utils');

const getContacts = async (req, res) => {
  const { _id: owner } = req.user;
  const contacts = await getContactsService(owner, req.query);
  return res.json(contacts);
};

const getContact = async (req, res) => {
  const { contactId } = req.params;
  const contact = await getContactService(contactId);
  return res.json(contact);
};

const createContact = async (req, res) => {
  const { _id: owner } = req.user;
  const newContact = await createContactService({ ...req.body, owner });
  return res.status(201).json(newContact);
};

const updateContact = async (req, res) => {
  const { contactId } = req.params;
  const updateContact = await updateContactService(contactId, req.body);
  res.json(updateContact);
};

const deleteContact = async (req, res) => {
  const { contactId } = req.params;
  await deleteContactService(contactId);
  return res.json({ message: 'Contact deleted' });
};

module.exports = {
  getContacts: controllerWrapper(getContacts),
  getContact: controllerWrapper(getContact),
  createContact: controllerWrapper(createContact),
  updateContact: controllerWrapper(updateContact),
  deleteContact: controllerWrapper(deleteContact),
};
