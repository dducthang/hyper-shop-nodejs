const User = require("../user");

exports.getUser = async (filter) => {
  return await User.findOne(filter);
};

exports.getUsers = (filter) => {
  return User.find(filter);
};
exports.getUsersApi = (filter) => {
  return User.find(filter).select("email name _id isLock isAdmin");
};

exports.Block_Unblock = async (_id) => {
  const user = await User.findById(_id);
  user.isLock = user.isLock ? "false" : "true";
  return user.save();
};
