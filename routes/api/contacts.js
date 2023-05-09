const express = require('express');

const router = express.Router();

const {
  listContacts,
  getContactById,
  // removeContact,
  // addContact,
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
  // res.json({ message: 'template message' });
});

router.delete('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' });
});

router.put('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' });
});

module.exports = router;
