const User = require("../user");

exports.getUser = async (filter) => {
  return await User.findOne(filter);
};

exports.getUsers = (filter) => {
  return User.find(filter);
};

exports.Block_Unblock = async (_id) => {
  const user = await User.findById(_id);
  user.isLock = user.isLock ? "false" : "true";
  console.log(user);
  return user.save();
};
