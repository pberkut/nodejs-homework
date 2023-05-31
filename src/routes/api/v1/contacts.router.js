const express = require('express');

const { contactController } = require('../../../controllers');

const contactValidation = require('../../../validations/contact.validation');

const {
  isValidId,
  authenticate,
  validateBody,
} = require('../../../middlewares');

const router = express.Router();

router.get('/', authenticate, contactController.getAllContacts);

router.get(
  '/:contactId',
  authenticate,
  isValidId,
  contactController.getContactById,
);

router.post(
  '/',
  authenticate,
  validateBody(contactValidation.createContact),
  contactController.createContact,
);

router.put(
  '/:contactId',
  authenticate,
  isValidId,
  validateBody(contactValidation.updateContact),
  contactController.updateContact,
);

router.patch(
  '/:contactId/favorite',
  authenticate,
  isValidId,
  validateBody(contactValidation.updateFavoriteContact),
  contactController.updateContact,
);

router.delete(
  '/:contactId',
  authenticate,
  isValidId,
  contactController.deleteContact,
);

module.exports = { contactsRouter: router };
