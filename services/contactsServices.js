const fs = require('fs/promises');
const path = require('path');

const pathContacts = path.join(__dirname, '../models/contacts.json');

const getContactsService = async () => {
  const contacts = await fs.readFile(pathContacts);
  return JSON.parse(contacts);
};

const updateContactsService = async data =>
  await fs.writeFile(pathContacts, data);

module.exports = { getContactsService, updateContactsService };
