const UserService = require("../models/services/userService");
const User = require("../models/user");
exports.getUserList = async (req, res, next) => {
  const ITEMS_PER_PAGE = 2;
  let page = +req.query.page || 1;

  const totalUsers = await User.find().countDocuments();
  const userList = await User.find({ isAdmin: 0 })
    .skip((page - 1) * ITEMS_PER_PAGE)
    .limit(ITEMS_PER_PAGE);
  res.status(200).render("shop/userList", {
    pageTitle: "User list",
    user: req.user,
    userList,
    totalUsers,
    currentPage: page,
    hasNextPage: totalUsers > page * ITEMS_PER_PAGE,
    hasPreviousPage: page > 1,
    nextPage: page + 1,
    previousPage: page - 1,
    lastPage: Math.ceil(totalUsers / ITEMS_PER_PAGE),
  });
};

exports.getUserDetail = async (req, res, next) => {
  const userId = req.params.userId;
  const user = await UserService.getUser({ _id: userId });
  res.status(200).render("shop/userDetail", {
    pageTitle: "User Profile",
    user,
  });
};
