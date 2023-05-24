const { Contact } = require('../models');

const getContactsService = async owner => {
  return Contact.find({ owner }, '-createdAt -updatedAt').populate(
    'owner',
    'email subscription',
  );
};

const getContactService = async contactId => {
  return Contact.findOne({ _id: contactId });
};

const createContactService = async body => {
  return Contact.create(body);
};

const updateContactService = async (contactId, body) => {
  return Contact.findByIdAndUpdate({ _id: contactId }, body, { new: true });
};

const updateFavoriteContactService = async (contactId, body) => {
  return Contact.findByIdAndUpdate({ _id: contactId }, body, { new: true });
};

const deleteContactService = async contactId => {
  return Contact.findOneAndRemove({ _id: contactId });
};

module.exports = {
  getContactsService,
  getContactService,
  createContactService,
  updateContactService,
  deleteContactService,
  updateFavoriteContactService,
};
