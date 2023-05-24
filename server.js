const mongoose = require('mongoose');
const app = require('./app');

const { DB_HOST_URI, PORT = 3000 } = process.env;

mongoose
  .connect(DB_HOST_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}`);
      console.log('Database connection successful');
    });
  })
  .catch(error => {
    console.log(`Server not running. Error message: ${error.message}`);
    process.exit(1);
  });
