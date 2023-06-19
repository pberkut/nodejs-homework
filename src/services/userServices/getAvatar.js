const { User } = require('../../models');

const getAvatar = async userId => {
  const { avatarURL, idCloudAvatar } = await User.findById(userId);
  return { avatarURL, idCloudAvatar };
};

module.exports = getAvatar;
