const fs = require('fs/promises');
const path = require('path');

const pathContacts = path.join(__dirname, './contacts.json');

const getAllContacts = async () => {
  const contacts = await fs.readFile(pathContacts);
  return JSON.parse(contacts);
};

const updateContacts = async data => await fs.writeFile(pathContacts, data);

const listContacts = async () => {
  return await getAllContacts();
};

const getContactById = async contactId => {
  const contacts = await getAllContacts();
  const contactById = contacts.find(contact => contact.id === contactId);

  if (!contactById) {
    return null;
  }

  return contactById;
};

const removeContact = async contactId => {
  const contacts = await getAllContacts();
  const index = contacts.findIndex(contact => contact.id === contactId);

  if (index === -1) {
    return null;
  }

  const [result] = contacts.splice(index, 1);

  await updateContacts(contacts);

  return result;
};

const addContact = async body => {};

const updateContact = async (contactId, body) => {};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
