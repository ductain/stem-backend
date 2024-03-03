const jwt = require("jsonwebtoken");
const cookie = require('cookie')

const loginSuccess = (req, res) => {
  // if (req.user) {
  //   // const token = jwt.sign({ user: req.user }, "rommel");
  //   // res.cookie("token", token, { httpOnly: true });
  //   res.status(200).json({
  //     success: true,
  //     message: "successfull",
  //     user: req.user,
  //   });
  // }
  // Retrieve the JWT token from the cookie
  const cookies = req.headers.cookie;
  const parsedCookies = cookie.parse(cookies || "");
  const token = parsedCookies.token;

  if (token) {
    try {
      // Verify and decode the JWT token
      const decoded = jwt.verify(token, 'rommel');

      // The user information is available in the decoded payload
      const user = decoded;

      res.status(200).json({
        success: true,
        message: "Login successful",
        user: user,
      });
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
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("http://localhost:5173");
  });
};

module.exports = {
  loginSuccess: loginSuccess,
  loginFailed: loginFailed,
  logout: logout,
};
