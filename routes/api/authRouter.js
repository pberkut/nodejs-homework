const express = require('express');

const {
  registerUser,
  loginUser,
  getCurrentUser,
  logoutUser,
} = require('../../controllers/authControllers');

const { authenticate, validateBody } = require('../../middlewares');
const { registerUserSchema, loginUserSchema } =
  require('../../schemas').userSchemas;

const router = express.Router();

router.post('/register', validateBody(registerUserSchema), registerUser);

router.post('/login', validateBody(loginUserSchema), loginUser);

router.get('/current', authenticate, getCurrentUser);

router.post('/logout', authenticate, logoutUser);

module.exports = { usersRouter: router };
