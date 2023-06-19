const { User } = require('../../models');

const updateSubscription = async (userId, body) => {
  const { email, subscription } = await User.findByIdAndUpdate(userId, body, {
    new: true,
    select: 'email subscription',
  });
  return { email, subscription };
};

module.exports = updateSubscription;
