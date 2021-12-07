const User = require("../user");

exports.getUserLean = async (filter) => {
  return await User.findOne(filter).lean();
};
