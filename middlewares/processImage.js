const Jimp = require('jimp');
const HttpError = require('../utils/HttpError');

const processImage = async (req, res, next) => {
  const { path } = req.file;
  await Jimp.read(path, (err, image) => {
    if (err) throw new HttpError();
    image.resize(250, 250).quality(90).write(path);
    next();
  });
};

module.exports = processImage;
