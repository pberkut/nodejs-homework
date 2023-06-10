const fs = require('fs/promises');

const { controllerWrapper } = require('../../utils');
const { userService } = require('../../services');
const cloudServices = require('../../services/cloud.service');

const uploadAvatarUser = controllerWrapper(async (req, res) => {
  const { _id } = req.user;
  const pathFile = req.file.path;

  const { secure_url: avatarURL, public_id: idCloudAvatar } = await cloudServices.uploadAvatar(
    pathFile,
  );

  const oldAvatar = await userService.getAvatar(_id);
  await cloudServices.deleteAvatar(oldAvatar);
  await userService.updateAvatar(_id, avatarURL, idCloudAvatar);
  await fs.unlink(pathFile);

  res.json({ avatarURL });
});

module.exports = uploadAvatarUser;
