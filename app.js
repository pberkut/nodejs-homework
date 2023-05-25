require('dotenv').config();
const express = require('express');
const logger = require('morgan');
const cors = require('cors');

const { contactsRouter, usersRouter } = require('./routes/api');
const { globalErrorHandler } = require('./middlewares');

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use('/api/contacts', contactsRouter);
app.use('/users', usersRouter);

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

app.use(globalErrorHandler);

module.exports = app;
