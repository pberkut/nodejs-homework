const express = require('express');

const {
  registerUser,
  loginUser,
  getCurrentUser,
  logoutUser,
} = require('../../controllers/authControllers');

const { validateBody } = require('../../decorators');
const { registerUserSchema, loginUserSchema } =
  require('../../schemas').userSchemas;
const { authenticate } = require('../../middlewares');

const router = express.Router();

// signup
router.post('/register', validateBody(registerUserSchema), registerUser);

// signin
router.post('/login', validateBody(loginUserSchema), loginUser);

router.get('/current', authenticate, getCurrentUser);

router.post('/logout', authenticate, logoutUser);

module.exports = { usersRouter: router };
