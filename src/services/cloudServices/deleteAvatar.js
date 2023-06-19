const { Cloudinary } = require('../../utils');

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

module.exports = deleteAvatar;
