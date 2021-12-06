const bcrypt = require("bcrypt");

exports.getLogin = (req, res, next) => {
  res.render("auth/login", {
    pageTitle: "Login",
    user: req.user
  });
};
