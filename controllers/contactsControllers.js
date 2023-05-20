const {
  getContactsService,
  getContactService,
  createContactService,
  updateContactService,
  deleteContactService,
} = require('../services/contactsServices');

const { HttpError } = require('../helpers');

const { controllerWrapper } = require('../decorators');

const getContacts = async (req, res) => {
  const contacts = await getContactsService();
  if (!contacts) {
    throw HttpError(404, 'Contacts not found');
  }
  return res.json(contacts);
};

const getContact = async (req, res) => {
  const { contactId } = req.params;
  const contact = await getContactService(contactId);
  if (!contact) {
    throw HttpError(404, `Contact with id: ${contactId} not found`);
  }
  return res.json(contact);
};

const createContact = async (req, res) => {
  const newContact = await createContactService(req.body);
  return res.status(201).json(newContact);
};

const updateContact = async (req, res) => {
  const { contactId } = req.params;
  const updateContact = await updateContactService(contactId, req.body);
  if (!updateContact) {
    throw HttpError(404, `Contact with id: ${contactId} not found`);
  }
  res.json(updateContact);
};

const deleteContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await deleteContactService(contactId);
  if (!result) {
    throw HttpError(404, `Contact with id: ${contactId} not found`);
  }
  return res.json({ message: 'Contact deleted' });
};

const updateFavoriteContact = async (req, res) => {
  const { contactId } = req.params;
  const updateContact = await updateContactService(contactId, req.body);
  if (!updateContact) {
    throw HttpError(404, `Contact with id: ${contactId} not found`);
  }
  res.json(updateContact);
};

module.exports = {
  getContacts: controllerWrapper(getContacts),
  getContact: controllerWrapper(getContact),
  createContact: controllerWrapper(createContact),
  updateContact: controllerWrapper(updateContact),
  deleteContact: controllerWrapper(deleteContact),
  updateFavoriteContact: controllerWrapper(updateFavoriteContact),
};
