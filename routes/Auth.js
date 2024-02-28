const router = require("express").Router();
const passport = require("passport");
const jwt = require('jsonwebtoken');
const { loginSuccess, loginFailed, logout } = require("../controllers/auth");
// const CLIENT_URL = process.env.NODE_ENV === "production" ? "https://stem-dun.vercel.app/student" : "http://localhost:5173/student";
// const HOME_URL = process.env.NODE_ENV === "production" ? "https://stem-dun.vercel.app/" : "http://localhost:5173";

const CLIENT_URL = "http://localhost:5173/student"
const HOME_URL = "http://localhost:5173"

router.get("/login/success", loginSuccess);
router.get("/login/failed", loginFailed);
router.get("/logout", logout);
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));
router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: '/auth/login/success',
    failureRedirect: "/auth/login/failed",
  })
);

module.exports = router;
