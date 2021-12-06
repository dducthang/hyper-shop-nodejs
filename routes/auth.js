const express = require("express");
const passport = require("passport");

const authController = require("../controllers/auth");
const { checkNotAuthenticated, checkAuthenticated } = require("../config/auth");

const router = express.Router();

router.get("/login", checkNotAuthenticated, authController.getLogin);

router.post(
  "/login",
  checkNotAuthenticated,
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/auth/login",
    failureFlash: true,
  })
);

router.get("/logout", (req, res, next) => {
  req.logout();
  res.redirect("/auth/login");
});

module.exports = router;
