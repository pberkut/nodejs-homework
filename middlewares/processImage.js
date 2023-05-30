const Jimp = require('jimp');
const HttpError = require('../utils/HttpError');

const processImage = async (req, res, next) => {
  if (!req.file) {
    return next(new HttpError(400, 'Uploaded file was empty'));
  }
  const { path } = req.file;

  await Jimp.read(path, (err, image) => {
    if (err) next(new HttpError('400'));
    image.resize(250, 250).quality(80).greyscale().write(path);
    next();
  });
};

module.exports = processImage;
