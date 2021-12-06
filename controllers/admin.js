exports.getProfile = (req, res, next) => {
  res.render("shop/profile", {
    pageTitle: "Profile",
    profile: req.user,
  });
};
