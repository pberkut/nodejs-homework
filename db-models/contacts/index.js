const fs = require('fs/promises');
const path = require('path');

const pathContacts = path.join(
  process.cwd(),
  'db-models',
  'contacts',
  'contacts.json',
);

const getAllContacts = async () => {
  const contacts = await fs.readFile(pathContacts);
  return JSON.parse(contacts);
};

const writeAllContacts = async data =>
  await fs.writeFile(pathContacts, JSON.stringify(data, null, 2));

module.exports = { getAllContacts, writeAllContacts };
