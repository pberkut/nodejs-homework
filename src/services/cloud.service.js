const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadAvatar = pathFile => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      pathFile,
      { folder: 'avatars' },
      (error, result) => {
        if (error) reject(error);
        if (result) resolve(result);
      },
    );
  });
};

const deleteAvatar = oldAvatar => {
  if (!oldAvatar.idCloudAvatar) {
    return;
  }
  return new Promise((resolve, reject) => {
    cloudinary.uploader.destroy(oldAvatar.idCloudAvatar, (error, result) => {
      if (error) reject(error);
      if (result) resolve(result);
    });
  });
};

const cloudServices = { uploadAvatar, deleteAvatar };

module.exports = cloudServices;
