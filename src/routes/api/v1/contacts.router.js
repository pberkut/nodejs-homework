const express = require('express');
const { contactController } = require('../../../controllers');
const contactValidation = require('../../../validations/contact.validation');
const {
  isValidId,
  authenticate,
  validateBody,
} = require('../../../middlewares');

const router = express.Router();

router.use(authenticate);

router.get('/', contactController.getAllContacts);
router.get('/:contactId', isValidId, contactController.getContactById);
router.post(
  '/',
  validateBody(contactValidation.createContact),
  contactController.createContact,
);
router.put(
  '/:contactId',
  isValidId,
  validateBody(contactValidation.updateContact),
  contactController.updateContact,
);
router.patch(
  '/:contactId/favorite',
  isValidId,
  validateBody(contactValidation.updateFavoriteContact),
  contactController.updateContact,
);
router.delete('/:contactId', isValidId, contactController.deleteContact);

module.exports = { contactsRouter: router };
