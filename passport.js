const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");
const GOOGLE_CLIENT_ID =
  "1065655178044-qk5gjsoqt5lsd02ec8c7d41hd32ccvj4.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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";

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      done(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
