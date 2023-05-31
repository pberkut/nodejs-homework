const mongoose = require('mongoose');
let uri;

if (process.env.NODE_ENV === 'test') {
  uri = process.env.DB_TEST_URI;
} else {
  uri = process.env.DB_HOST_URI;
}

const connectDB = mongoose.connect(uri);

if (process.env.NODE_ENV !== 'test') {
  mongoose.connection.on('connected', () => {
    console.log('Database connection established successfully!');
  });

  mongoose.connection.on('error', error => {
    console.log(`Mongoose connection error: ${error}`);
  });

  mongoose.connection.on('disconnected', () => {
    console.log('Disconnected from database');
  });
}

process.on('SIGINT', async () => {
  mongoose.connection.close(() => {
    console.log('Disconnected from DB');
    process.exit(1);
  });
});
module.exports = connectDB;
