const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");
const sql = require("mssql");
const config = require("./dbConfig");
const GOOGLE_CLIENT_ID =
  "1065655178044-qk5gjsoqt5lsd02ec8c7d41hd32ccvj4.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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";
const jwt = require('jsonwebtoken');

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      const { id, displayName, emails, photos } = profile;
      const user = {
        googleId: id,
        name: displayName,
        email: emails[0].value,
        avatar: photos[0].value,
        role: "Student",
      };

      // Check if the user already exists in the database
      const query = "SELECT * FROM Account WHERE GoogleId = @googleId";
      const parameters = { googleId: user.googleId };

      await sql.connect(config, (err) => {
        if (err) {
          return done(err);
        }

        const request = new sql.Request();
        request.input("googleId", sql.NVarChar, user.googleId);
        request.query(query, (error, results) => {
          if (error) {
            return done(error);
          }

          if (results.recordset.length > 0) {
            // User already exists, return the user information
            const existingUser = results.recordset[0];
            const token = jwt.sign({ user: existingUser }, 'rommel');
            done(null, {existingUser, token});
            // done(null, existingUser);
          } else {
            // User doesn't exist, insert a new row into the Account table
            const insertQuery =
              "INSERT INTO Account (GoogleId, Name, Email, Avatar, Role) VALUES (@googleId, @name, @email, @avatar, @role)";
            request.input("name", sql.NVarChar, user.name);
            request.input("email", sql.NVarChar, user.email);
            request.input("avatar", sql.NVarChar, user.avatar);
            request.input("role", sql.NVarChar, user.role);
            request.query(insertQuery, (error) => {
              if (error) {
                return done(error);
              }
              // done(null, user);
              const token = jwt.sign({ user }, 'rommel');
              done(null, {user, token});
            });
          }
        });
      });
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
