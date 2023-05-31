const app = require('./app');
const connectDB = require('./db/connectDB');

const { PORT = 3000 } = process.env;

(async () => {
  try {
    await connectDB;

    app.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
  } catch (error) {
    console.log(`Server not running. Error message: ${error.message}`);
    process.exit(1);
  }
})();
