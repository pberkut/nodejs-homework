const express = require('express');

const {
  getContacts,
  getContact,
  createContact,
  updateContact,
  deleteContact,
  updateFavoriteContact,
} = require('../../controllers/contactsControllers');

const { validateBody } = require('../../decorators');
const { createContactSchema, updateContactSchema } = require('../../schemas');

const router = express.Router();

router.get('/', getContacts);

router.get('/:contactId', getContact);

router.post('/', validateBody(createContactSchema), createContact);

router.put('/:contactId', validateBody(updateContactSchema), updateContact);

router.patch('/:contactId/favorite', updateFavoriteContact);

router.delete('/:contactId', deleteContact);

module.exports = { contactsRouter: router };
