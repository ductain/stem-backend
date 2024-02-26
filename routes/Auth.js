const router = require("express").Router();
const passport = require("passport");
const jwt = require('jsonwebtoken')
// const CLIENT_URL = process.env.NODE_ENV === "production" ? "https://stem-dun.vercel.app/student" : "http://localhost:5173/student";
// const HOME_URL = process.env.NODE_ENV === "production" ? "https://stem-dun.vercel.app/" : "http://localhost:5173";

const CLIENT_URL = "http://localhost:5173/student"
const HOME_URL = "http://localhost:5173"

router.get("/login/success", (req, res) => {
  if (req?.user) {
    const token = jwt.sign({ user: req.user }, 'rommel');
    res.cookie('token', token, { httpOnly: true });
    res.status(200).json({
      success: true,
      message: "successfull",
      user: req?.user,
    });
  }
});
router.get("/login/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: "failure",
  });
});
router.get("/logout", (req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect(HOME_URL);
  });
});
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));
router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: CLIENT_URL,
    failureRedirect: "/auth/login/failed",
  })
);

module.exports = router;
