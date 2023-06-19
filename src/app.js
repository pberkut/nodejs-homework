require('dotenv').config();
const express = require('express');
const logger = require('morgan');
const cors = require('cors');

const { router } = require('./routes/api/v1');
const { notFound, globalErrorHandler } = require('./middlewares');

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.use(router);

app.use(notFound);

app.use(globalErrorHandler);

module.exports = app;
