const jwt = require("jsonwebtoken");

const loginSuccess = (req, res) => {
  if (req.user) {
    const token = jwt.sign({ user: req.user }, "rommel");
    res.cookie("token", token, { httpOnly: true });
    res.status(200).json({
      success: true,
      message: "successfull",
      user: req.user,
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
    logout: logout
}
