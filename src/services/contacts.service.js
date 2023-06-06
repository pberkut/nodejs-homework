const { Contact } = require('../models');
const { HttpError } = require('../utils');

const getAllContacts = async (owner, query) => {
  const { page = 1, limit = 10, favorite } = query;
  const skip = (page - 1) * limit;
  const filter = {
    owner,
  };
  if (favorite === 'true') {
    filter.favorite = true;
  } else if (favorite === 'false') {
    filter.favorite = false;
  }
  const contacts = await Contact.find(filter, '-createdAt -updatedAt', {
    skip,
    limit,
  }).populate('owner', 'email subscription');

  if (!contacts) {
    throw new HttpError(404, 'Contacts not found');
  }
  return contacts;
};

const getContactById = async contactId => {
  const contact = await Contact.findOne({ _id: contactId });
  if (!contact) {
    throw new HttpError(404, `Contact with id: ${contactId} not found`);
  }
  return contact;
};

const createContact = async body => {
  return Contact.create(body);
};

const updateContact = async (contactId, body) => {
  const updateContact = await Contact.findByIdAndUpdate(
    { _id: contactId },
    body,
    {
      new: true,
    },
  );
  if (!updateContact) {
    throw new HttpError(404, `Contact with id: ${contactId} not found`);
  }
  return updateContact;
};

const deleteContact = async contactId => {
  const contact = await Contact.findOneAndRemove({ _id: contactId });
  if (!contact) {
    throw new HttpError(404, `Contact with id: ${contactId} not found`);
  }
  return contactId;
};

module.exports = {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact,
};
