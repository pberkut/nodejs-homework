const { Contact } = require('../models');
const { HttpError } = require('../utils');

const getContactsService = async (owner, query) => {
  const { page = 1, limit = 10 } = query;
  const skip = (page - 1) * limit;
  const contacts = Contact.find({ owner }, '-createdAt -updatedAt', {
    skip,
    limit,
  }).populate('owner', 'email subscription');

  if (!contacts) {
    throw new HttpError(404, 'Contacts not found');
  }
  return contacts;
};

const getContactService = async contactId => {
  const contact = Contact.findOne({ _id: contactId });
  if (!contact) {
    throw new HttpError(404, `Contact with id: ${contactId} not found`);
  }
  return contact;
};

const createContactService = async body => {
  return Contact.create(body);
};

const updateContactService = async (contactId, body) => {
  const updateContact = Contact.findByIdAndUpdate({ _id: contactId }, body, {
    new: true,
  });
  if (!updateContact) {
    throw new HttpError(404, `Contact with id: ${contactId} not found`);
  }
  return updateContact;
};

const deleteContactService = async contactId => {
  const contact = Contact.findOneAndRemove({ _id: contactId });
  if (!contact) {
    throw new HttpError(404, `Contact with id: ${contactId} not found`);
  }
  return contactId;
};

module.exports = {
  getContactsService,
  getContactService,
  createContactService,
  updateContactService,
  deleteContactService,
};
