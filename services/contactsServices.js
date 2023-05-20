const { Contact } = require('../models/contactModel');

const getContactsService = async () => {
  return Contact.find({}, '-createdAt -updatedAt');
};

const getContactService = async contactId => {
  return Contact.findOne({ _id: contactId });
};

const createContactService = async data => {
  return Contact.create(data);
};

const updateContactService = async (contactId, data) => {
  return Contact.findByIdAndUpdate({ _id: contactId }, data, { new: true });
};

const deleteContactService = async contactId => {
  return Contact.findOneAndRemove({ _id: contactId });
};

const updateFavoriteContactService = async (contactId, data) => {
  return Contact.findByIdAndUpdate({ _id: contactId }, data, { new: true });
};

module.exports = {
  getContactsService,
  getContactService,
  createContactService,
  updateContactService,
  deleteContactService,
  updateFavoriteContactService,
};
