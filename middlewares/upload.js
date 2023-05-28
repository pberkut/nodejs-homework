const multer = require('multer');
const path = require('path');
const { HttpError } = require('../utils');

const tempDir = path.join(__dirname, '../', 'temp');

const multerConfig = multer.diskStorage({
  destination: tempDir,
  filename: (req, file, cb) => {
    cb(null, file.originalname.toLowerCase().split(' ').join('-'));
  },
});

const upload = multer({
  storage: multerConfig,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
      cb(null, true);
    } else {
      // cb(null, false);
      cb(
        new HttpError(
          415,
          'Unsupported Media Type. Only .jpg and .jpeg format allowed!',
        ),
      );
    }
  },
});

module.exports = upload;
