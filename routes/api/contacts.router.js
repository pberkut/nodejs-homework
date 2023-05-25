const express = require('express');

const {
  getContacts,
  getContact,
  createContact,
  updateContact,
  deleteContact,
} = require('../../controllers/contacts.controllers');

const {
  createContactValidationSchema,
  updateContactValidationSchema,
  updateFavoriteContactValidationSchema,
} = require('../../schemas/contact.schemas');

const { isValidId, authenticate, validateBody } = require('../../middlewares');

const router = express.Router();

router.get('/', authenticate, getContacts);

router.get('/:contactId', authenticate, isValidId, getContact);

router.post(
  '/',
  authenticate,
  validateBody(createContactValidationSchema),
  createContact,
);

router.put(
  '/:contactId',
  authenticate,
  isValidId,
  validateBody(updateContactValidationSchema),
  updateContact,
);

router.patch(
  '/:contactId/favorite',
  authenticate,
  isValidId,
  validateBody(updateFavoriteContactValidationSchema),
  updateContact,
);

router.delete('/:contactId', authenticate, isValidId, deleteContact);

module.exports = { contactsRouter: router };
