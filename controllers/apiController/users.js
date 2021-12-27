const UserService = require("../../models/services/userService");
exports.getUsersApi = async (req, res, next) => {
  const ITEMS_PER_PAGE = 2;
  let page = req.query.page;
  let users = await UserService.getUsers();
  const usersCount = users.length;

  if (page === "First") page = 1;
  if (page === "Last") page = Math.ceil(usersCount / ITEMS_PER_PAGE);

  users = await UserService.getUsers()
    .skip((page - 1) * ITEMS_PER_PAGE)
    .limit(ITEMS_PER_PAGE);

  res.status(200).send({
    users,
    page,
    lastPage: Math.ceil(usersCount / ITEMS_PER_PAGE),
  });
};
