const { Cloudinary } = require('../../utils');

const uploadAvatar = pathFile => {
  return new Promise((resolve, reject) => {
    Cloudinary.uploader.upload(pathFile, { folder: 'avatars' }, (error, result) => {
      if (error) reject(error);
      if (result) resolve(result);
    });
  });
};

module.exports = uploadAvatar;
