const express = require('express');

const {
  registerUser,
  loginUser,
  getCurrentUser,
  logoutUser,
} = require('../../controllers/authControllers');

const { validateBody } = require('../../decorators');
const { registerUserSchema, loginUserSchema, getCurrentUserSchema } =
  require('../../schemas').userSchemas;
const { isValidId } = require('../../middlewares');

const router = express.Router();

// signup
router.post('/register', validateBody(registerUserSchema), registerUser);

// signin
router.post('/login', validateBody(getCurrentUserSchema), loginUser);

router.get('/current', isValidId, getCurrentUser);

router.post('/logout', logoutUser);

module.exports = { usersRouter: router };
