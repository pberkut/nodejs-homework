const app = require('./app');
const connectDB = require('./db/connectDB');

const { DB_HOST_URI, PORT = 3000 } = process.env;

(async () => {
  try {
    await connectDB(DB_HOST_URI);
    console.log('Database connection established successfully!');

    app.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
  } catch (error) {
    console.log(`Server not running. Error message: ${error.message}`);
    process.exit(1);
  }
})();
