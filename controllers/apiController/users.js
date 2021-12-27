const UserService = require("../../models/services/userService");
exports.getUsersApi = async (req, res, next) => {
  const page = req.query.page;
  console.log("---------------------page: ", page);
  const users = await UserService.getUsers();
  //   console.log(users);
  res.status(200).send({
    users,
  });
};
