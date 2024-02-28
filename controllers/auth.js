const jwt = require("jsonwebtoken");

const loginSuccess = (req, res) => {
  const timeout = 60000;

  // Create a timer that will respond with a timeout error
  const timeoutTimer = setTimeout(() => {
    res.status(504).json({
      success: false,
      message: "Request timed out",
    });
  }, timeout);
  if (req?.user) {
    const token = jwt.sign({ user: req.user }, "rommel");
    res.cookie("token", token, { httpOnly: true });
    res.status(200).json({
      success: true,
      message: "successfull",
      user: req?.user,
    });
  }
  // Clear the timeout timer if the response has been sent
  clearTimeout(timeoutTimer);
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
    logout: logout
}
