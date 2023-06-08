const multer = require('multer');
const path = require('path');
const { HttpError } = require('../utils');

const tempDir = path.join(process.cwd(), process.env.UPLOADS_DIR);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, tempDir);
  },
  filename: (req, file, cb) => {
    const uniquePrefix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const normalizeFilename = file.originalname
      .toLowerCase()
      .split(' ')
      .join('-');

    const newFilename = `${uniquePrefix}_${normalizeFilename}`;

    cb(null, newFilename);
  },
});

const limits = {
  fileSize: 2048 * 1024,
};

const fileFilter = (req, file, cb) => {
  const { mimetype } = file;
  if (mimetype === 'image/jpg' || mimetype === 'image/jpeg') {
    return cb(null, true);
  }

  cb(
    new HttpError(
      415,
      'Unsupported Media Type. Only .jpg and .jpeg format allowed!',
    ),
    false,
  );
};

const Upload = multer({
  storage,
  limits,
  fileFilter,
});

module.exports = Upload;
