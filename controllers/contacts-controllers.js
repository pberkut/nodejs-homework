const {
  getContactsService,
  getContactService,
  createContactService,
  updateContactService,
  deleteContactService,
} = require('../services/contacts-services');

const { HttpError, controllerWrapper } = require('../utils');

const getContacts = async (req, res) => {
  const { _id: owner } = req.user;
  const contacts = await getContactsService(owner, req.query);
  if (!contacts) {
    throw new HttpError(404, 'Contacts not found');
  }
  return res.json(contacts);
};

const getContact = async (req, res) => {
  const { contactId } = req.params;
  const contact = await getContactService(contactId);
  if (!contact) {
    throw new HttpError(404, `Contact with id: ${contactId} not found`);
  }
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
  if (!updateContact) {
    throw new HttpError(404, `Contact with id: ${contactId} not found`);
  }
  res.json(updateContact);
};

const updateFavoriteContact = async (req, res) => {
  const { contactId } = req.params;
  const updateContact = await updateContactService(contactId, req.body);
  if (!updateContact) {
    throw new HttpError(404, `Contact with id: ${contactId} not found`);
  }
  res.json(updateContact);
};

const deleteContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await deleteContactService(contactId);
  if (!result) {
    throw new HttpError(404, `Contact with id: ${contactId} not found`);
  }
  return res.json({ message: 'Contact deleted' });
};

module.exports = {
  getContacts: controllerWrapper(getContacts),
  getContact: controllerWrapper(getContact),
  createContact: controllerWrapper(createContact),
  updateContact: controllerWrapper(updateContact),
  updateFavoriteContact: controllerWrapper(updateFavoriteContact),
  deleteContact: controllerWrapper(deleteContact),
};
