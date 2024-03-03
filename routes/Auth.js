const router = require("express").Router();
const passport = require("passport");
const { loginSuccess, loginFailed, logout } = require("../controllers/auth");
// const CLIENT_URL = process.env.NODE_ENV === "production" ? "https://stem-dun.vercel.app/student" : "http://localhost:5173/student";
// const HOME_URL = process.env.NODE_ENV === "production" ? "https://stem-dun.vercel.app/" : "http://localhost:5173";

const CLIENT_URL = "http://localhost:5173/student"
const HOME_URL = "http://localhost:5173"

router.get("/login/success", loginSuccess);
router.get("/login/failed", loginFailed);
router.get("/logout", logout);
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));
// router.get(
//   "/google/callback",
//   passport.authenticate("google", {
//     successRedirect: CLIENT_URL,
//     failureRedirect: "/auth/login/failed",
//   })
// );
router.get("/google/callback", (req, res, next) => {
  passport.authenticate("google", (err, { user, token }) => {
    if (err) {
      res.redirect('/auth/login/failed')
    }

    // Set the JWT token as a cookie
    res.cookie("token", token, {
      httpOnly: true, // Make the cookie accessible only via HTTP(S)
      path: "/",
      maxAge: 24 * 60 * 60 * 1000,
      // Other cookie options (e.g., secure, maxAge, etc.) can be added here
    });

    // Redirect to the desired page
    res.redirect(CLIENT_URL);
  })(req, res, next);
});

module.exports = router;
