const jwt = require("jsonwebtoken");
const sql = require("mssql");
const config = require("../dbConfig");
const loginSuccess = (req, res) => {
  const token = req.cookies.token;

  if (token) {
    try {
      // Verify and decode the JWT token
      const decoded = jwt.verify(token, 'rommel');

      // The user information is available in the decoded payload
      const user = decoded.user;

      if (user.Role === 'Student') {
        // Query the student account based on the user's email
        const query = "SELECT Id FROM Student WHERE Email = @email";
        const parameters = { email: user.Email };

        // Execute the SQL query to retrieve the userId
        // Replace this part with your actual database query code
        // For example, using the "mssql" library:
        sql.connect(config, (err) => {
          if (err) {
            return res.status(500).json({
              success: false,
              message: "Database error",
            });
          }

          const request = new sql.Request();
          request.input("email", sql.NVarChar, user.Email);
          request.query(query, (error, results) => {
            if (error) {
              return res.status(500).json({
                success: false,
                message: "Database error",
              });
            }

            const userId = results.recordset.length > 0 ? results.recordset[0].Id : null;

            res.status(200).json({
              success: true,
              message: "Login successful",
              user: user,
              userId: userId,
            });
          });
        });
      } else {
        res.status(200).json({
          success: true,
          message: "Login successful",
          user: user,
        });
      }
    } catch (error) {
      // Handle token verification error
      res.status(401).json({
        success: false,
        message: "Invalid token",
      });
    }
  } else {
    res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }
};

const loginFailed = (req, res) => {
  res.status(401).json({
    success: false,
    message: "failure",
  });
};

const logout = (req, res) => {
  res.clearCookie('token');
  // req.logout(function (err) {
  //   if (err) {
  //     return next(err);
  //   }
  //   res.redirect("http://localhost:5173");
  // });
  res.redirect("http://localhost:5173");
};

module.exports = {
  loginSuccess: loginSuccess,
  loginFailed: loginFailed,
  logout: logout,
};
