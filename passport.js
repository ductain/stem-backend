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
      prompt: 'select_account'
    },
    async (accessToken, refreshToken, profile, done) => {
      const { id, displayName, emails, photos } = profile;
      const user = {
        GoogleId: id,
        Name: displayName,
        Email: emails[0].value,
        Avatar: photos[0].value,
        Role: "Student",
      };

      // Check if the user already exists in the database
      const query = "SELECT * FROM Account WHERE GoogleId = @googleId";
      const parameters = { GoogleId: user.GoogleId };

      await sql.connect(config, (err) => {
        if (err) {
          return done(err);
        }

        const request = new sql.Request();
        request.input("googleId", sql.NVarChar, user.GoogleId);
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
            request.input("name", sql.NVarChar, user.Name);
            request.input("email", sql.NVarChar, user.Email);
            request.input("avatar", sql.NVarChar, user.Avatar);
            request.input("role", sql.NVarChar, user.Role);
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
