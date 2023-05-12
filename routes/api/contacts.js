const express = require('express');

const router = express.Router();

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  // updateContact,
} = require('../../models/contacts');

router.get('/', async (req, res, next) => {
  const contacts = await listContacts();
  res.status(200).json(contacts);
});

router.get('/:contactId', async (req, res, next) => {
  const contactId = req.params.contactId;
  const contactById = await getContactById(contactId);

  res.status(200).json(contactById);
});

router.post('/', async (req, res, next) => {
  const body = {
    name: 'Petro',
    email: 'Petro@mail.com',
    phone: '1-800-333-22-11',
  };

  const newContact = await addContact(body);
});

router.delete('/:contactId', async (req, res, next) => {
  const contactId = req.params.contactId;
  const removeContactById = await removeContact(contactId);

  if (!removeContactById) {
    return res.status(404).json({ message: 'Not found' });
  }

  return res.status(200).json({ message: 'contact deleted' });
});

router.put('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' });
});

module.exports = { contactsRouter: router };
