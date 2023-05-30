const fs = require('fs/promises');
const path = require('path');

const { controllerWrapper } = require('../../utils');
const userServices = require('../../services/users.services');

const avatarsDir = path.join(process.cwd(), 'public', 'avatars');

const uploadAvatarUser = controllerWrapper(async (req, res) => {
  const { _id } = req.user;
  const { path: tempUploadPath, filename } = req.file;
  const avatarName = `${_id}_${filename}`;
  const resultUploadPath = path.join(avatarsDir, avatarName);

  await fs.rename(tempUploadPath, resultUploadPath);
  const avatarURL = path.join('avatars', avatarName);
  await userServices.updateAvatar(_id, { avatarURL });

  res.json({ avatarURL });
});

module.exports = uploadAvatarUser;
