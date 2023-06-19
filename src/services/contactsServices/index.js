const createContact = require('./createContact');
const getAllContacts = require('./getAllContacts');
const getContactById = require('./getContactById');
const updateContact = require('./updateContact');
const deleteContact = require('./deleteContact');

module.exports.contactsServices = {
  createContact,
  getAllContacts,
  getContactById,
  updateContact,
  deleteContact,
};
