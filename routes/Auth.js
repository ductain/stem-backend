const router = require("express").Router();
const passport = require("passport");
const { loginSuccess, loginFailed, logout } = require("../controllers/auth");
// const CLIENT_URL = process.env.NODE_ENV === "production" ? "https://stem-dun.vercel.app/student" : "http://localhost:5173/student";
// const HOME_URL = process.env.NODE_ENV === "production" ? "https://stem-dun.vercel.app/" : "http://localhost:5173";

const CLIENT_URL = "http://localhost:5173/student";
const HOME_URL = "http://localhost:5173";

router.get("/login/success", loginSuccess);
router.get("/login/failed", loginFailed);
router.get("/logout", logout);
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
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
      res.redirect("/auth/login/failed");
    }

    let redirectURL = '';
    if (user.role === 'Teacher') {
      redirectURL = 'http://localhost:5000/teacher';
    } 
    else if (user.role === 'Student') {
      redirectURL = 'http://localhost:5000/student';
    }
    else if (user.role === 'School Admin') {
      redirectURL = 'http://localhost:5000/school-admin';
    }
    else if (user.role === 'System Admin') {
      redirectURL = 'http://localhost:5000/system-admin';
    }
    else {
      redirectURL = 'http://localhost:5000/manager';
    }

    // Set the JWT token as a cookie
    res.cookie("token", token, {
      httpOnly: true, // Make the cookie accessible only via HTTP(S)
      path: "/",
      sameSite: "none",
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    // Redirect to the desired page
    res.redirect(redirectURL);
  })(req, res, next);
});

module.exports = router;
