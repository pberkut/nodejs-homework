const { randomUUID } = require('crypto');

const {
  getContactsService,
  updateContactsService,
} = require('../services/contactsServices');

const listContacts = async () => {
  return await getContactsService();
};

const getContactById = async contactId => {
  const contacts = await getContactsService();
  const contactById = contacts.find(contact => contact.id === contactId);

  if (!contactById) {
    return null;
  }

  return contactById;
};

const removeContact = async contactId => {
  const contacts = await getContactsService();
  const index = contacts.findIndex(contact => contact.id === contactId);

  if (index === -1) {
    return null;
  }

  const [result] = contacts.splice(index, 1);

  await updateContactsService(contacts);

  return result;
};

const addContact = async body => {
  const newContact = {
    id: randomUUID(),
    ...body,
  };

  const contacts = await getContactsService();

  contacts.push(newContact);
  await updateContactsService(contacts);

  return newContact;
};

const updateContact = async (contactId, body) => {};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
