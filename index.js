const express = require("express");
const session = require("express-session");
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const dotenv = require("dotenv").config();
const cors = require("cors");
const port = process.env.PORT || 5000;
const passport = require("passport");
const passportSetup = require("./passport");

const CSS_URL =
  " https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui.min.css";
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Library API",
      version: "1.0.0",
      description: "A simple Express Library API",
    },
    servers: [
      {
        url: "https://stem-backend.vercel.app/",
      },
      {
        url: "http://localhost:5000",
      },
    ],
  },
  apis: ["./routes/*.js"],
};
const specs = swaggerJsDoc(options);

const app = express();
app.use(
  "/api-docs",
  swaggerUI.serve,
  swaggerUI.setup(specs, { customCssUrl: CSS_URL })
);

app.use(
  cors({
    origin: "http://localhost:5173",
    // credentials: true,
    // optionsSuccessStatus: 200,
    // methods: "GET,POST,PUT,DELETE",
  })
);

const crypto = require("crypto");
const secret = crypto.randomBytes(32).toString("hex");
const salt = crypto.randomBytes(32).toString("hex");
const salt2 = crypto.randomBytes(16).toString("hex");
const salt3 = crypto.randomBytes(16).toString("hex");
const hash = crypto.createHmac("sha256", salt, salt2, salt3);
hash.update(secret);
const hashedSecret = hash.digest("hex");

app.use(
  session({
    secret: hashedSecret,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: "none",
      httpOnly: true,
      secure: true,
    },
  })
);

// app.use(
//   session({
//     name: "session",
//     keys: ["key1"],
//     maxAge: 24 * 60 * 60 * 1000,
//   })
// );

app.use(passport.initialize());
app.use(passport.session());

const authRoute = require("./routes/Auth");
const provinceRoute = require("./routes/Province");
const schoolRoute = require("./routes/School");
const studentRoute = require("./routes/Student");
const teacherRoute = require("./routes/Teacher");
const schoolYearRoute = require("./routes/SchoolYear");
const newsRoute = require("./routes/News");
const programRoute = require("./routes/Program");
const labRoute = require("./routes/Lab");
const tutorialRoute = require("./routes/Tutorial");
const groupRoute = require("./routes/Group");
app.use(express.json());
app.use("/auth", authRoute);
app.use("/province", provinceRoute);
app.use("/school", schoolRoute);
app.use("/student", studentRoute);
app.use("/teacher", teacherRoute);
app.use("/schoolYear", schoolYearRoute);
app.use("/news", newsRoute);
app.use("/program", programRoute);
app.use("/lab", labRoute);
app.use("/tutorial", tutorialRoute);
app.use("/group", groupRoute);
app.listen(port, () => {
  console.log(`Backend is running at port ${port}`);
});
