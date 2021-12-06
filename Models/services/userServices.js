const User = require("../user");

exports.getUser = async (filter) => {
  return await User.findOne(filter);
};
