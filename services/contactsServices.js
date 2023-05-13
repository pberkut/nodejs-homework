const { randomUUID } = require('crypto');

const { getAllContacts, writeAllContacts } = require('../db-models/contacts');

const getContactsService = async () => {
  const contacts = await getAllContacts();
  if (contacts.length === 0) {
    return null;
  }
  return contacts;
};

const getContactService = async contactId => {
  const contacts = await getAllContacts();
  const contact = contacts.find(contact => contact.id === contactId);
  return contact || null;
};

const createContactService = async data => {
  const contacts = await getAllContacts();
  const newContact = {
    id: randomUUID(),
    ...data,
  };
  contacts.push(newContact);
  await writeAllContacts(contacts);
  return newContact;
};

const updateContactService = async (contactId, data) => {
  const contacts = await getAllContacts();
  const index = contacts.findIndex(contact => contact.id === contactId);
  if (index === -1) {
    return null;
  }
  contacts[index] = { ...contacts[index], ...data };
  await writeAllContacts(contacts);
  return contacts[index];
};

const deleteContactService = async contactId => {
  const contacts = await getContactsService();
  const index = contacts.findIndex(contact => contact.id === contactId);
  if (index === -1) {
    return null;
  }
  contacts.splice(index, 1);
  await writeAllContacts(contacts);
  return contactId;
};

module.exports = {
  getContactsService,
  getContactService,
  createContactService,
  updateContactService,
  deleteContactService,
};
