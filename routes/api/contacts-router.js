const express = require('express');

const {
  getContacts,
  getContact,
  createContact,
  updateContact,
  deleteContact,
  updateFavoriteContact,
} = require('../../controllers/contacts-controllers');

const {
  createContactSchema,
  updateContactSchema,
  updateFavoriteContactSchema,
} = require('../../schemas/contact-schemas');

const { isValidId, authenticate, validateBody } = require('../../middlewares');

const router = express.Router();

router.get('/', authenticate, getContacts);

router.get('/:contactId', authenticate, isValidId, getContact);

router.post(
  '/',
  authenticate,
  validateBody(createContactSchema),
  createContact,
);

router.put(
  '/:contactId',
  authenticate,
  isValidId,
  validateBody(updateContactSchema),
  updateContact,
);

router.patch(
  '/:contactId/favorite',
  authenticate,
  isValidId,
  validateBody(updateFavoriteContactSchema),
  updateFavoriteContact,
);

router.delete('/:contactId', authenticate, isValidId, deleteContact);

module.exports = { contactsRouter: router };
