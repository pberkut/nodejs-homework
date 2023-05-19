const Contacts = require('../schemas/contacts');

const getContactsService = async () => {
  return Contacts.find();
};

const getContactService = async contactId => {
  return Contacts.findOne({ _id: contactId });
};

const createContactService = async data => {
  return Contacts.create(data);
};

const updateContactService = async (contactId, data) => {
  return Contacts.findByIdAndUpdate({ _id: contactId }, data, { new: true });
};

const deleteContactService = async contactId => {
  return Contacts.findOneAndRemove({ _id: contactId });
};

module.exports = {
  getContactsService,
  getContactService,
  createContactService,
  updateContactService,
  deleteContactService,
};
