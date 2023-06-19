const { Router } = require('express');
const { authRouter } = require('./auth.router');
const { contactsRouter } = require('./contacts.router');

const router = Router();

router.use('/auth', authRouter);
router.use('/api/contacts', contactsRouter);

module.exports = { router };
