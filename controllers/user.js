const UserService = require("../models/services/userService");
const User = require("../models/user");
exports.getUserList = async (req, res, next) => {
  const ITEMS_PER_PAGE = 3;
  let page = +req.query.page || 1;

  const totalUsers = await User.find().countDocuments();
  const userList = await User.find()
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

exports.getUserDetail = (req, res, next) => {
  res.status(200).render("shop/userDetail", {
    pageTitle: "User Profile",
    user: req.user,
  });
};
