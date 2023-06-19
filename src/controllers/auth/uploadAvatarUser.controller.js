const fs = require('fs/promises');

const { controllerWrapper } = require('../../utils');
const { userServices, cloudServices } = require('../../services');

const uploadAvatarUser = controllerWrapper(async (req, res) => {
  const { _id: userId } = req.user;
  const pathFile = req.file.path;

  const newAvatar = await cloudServices.uploadAvatar(pathFile);

  const { secure_url: newAvatarURL, public_id: newIdCloudAvatar } = newAvatar;

  const oldAvatar = await userServices.getAvatar(userId);
  await cloudServices.deleteAvatar(oldAvatar);
  await userServices.updateAvatar(userId, newAvatarURL, newIdCloudAvatar);
  await fs.unlink(pathFile);

  res.json({ newAvatarURL });
});

module.exports = uploadAvatarUser;
