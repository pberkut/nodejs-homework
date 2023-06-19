const { User } = require('../../models');

const updateAvatar = async (userId, newAvatarURL, newIdCloudAvatar) => {
  const { avatarURL, idCloudAvatar } = await User.findByIdAndUpdate(
    userId,
    { avatarURL: newAvatarURL, idCloudAvatar: newIdCloudAvatar },
    {
      new: true,
      select: 'avatarURL, idCloudAvatar',
    },
  );
  return { avatarURL, idCloudAvatar };
};

module.exports = updateAvatar;
