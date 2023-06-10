const { Cloudinary } = require('../utils');

const uploadAvatar = pathFile => {
  return new Promise((resolve, reject) => {
    Cloudinary.uploader.upload(pathFile, { folder: 'avatars' }, (error, result) => {
      if (error) reject(error);
      if (result) resolve(result);
    });
  });
};

const deleteAvatar = oldAvatar => {
  if (!oldAvatar.idCloudAvatar) {
    return;
  }
  return new Promise((resolve, reject) => {
    Cloudinary.uploader.destroy(oldAvatar.idCloudAvatar, (error, result) => {
      if (error) reject(error);
      if (result) resolve(result);
    });
  });
};

const cloudServices = { uploadAvatar, deleteAvatar };

module.exports = cloudServices;
