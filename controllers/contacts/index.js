const getAllContacts = require('./getAllContacts.controller');
const getContactById = require('./getContactById.controller');
const createContact = require('./createContact.controller');
const updateContact = require('./updateContact.controller');
const deleteContact = require('./deleteContact.controller');

module.exports = {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact,
};
