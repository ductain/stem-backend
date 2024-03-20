const express = require("express");
const session = require("express-session");
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const dotenv = require("dotenv").config();
const cors = require("cors");
const port = process.env.PORT || 5000;
const passport = require("passport");
const passportSetup = require("./passport");
const cookieParser = require('cookie-parser')
const CSS_URL =
  "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.11.9/swagger-ui.min.css";
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
        url: "http://localhost:5000/",
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
    origin: 'http://localhost:5173',
    credentials: true,
    optionsSuccessStatus: 200,
    methods: "GET,POST,PUT,DELETE",
  })
);

// test in vercel
// app.use(
//   cors({
//     origin: 'https://stem-dun.vercel.app',
//     credentials: true,
//     optionsSuccessStatus: 200,
//     methods: "GET,POST,PUT,DELETE",
//   })
// );

app.use(cookieParser())


app.use(passport.initialize());

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
const teamRoute = require("./routes/Team");
const memberRoute = require("./routes/Member");
const teamSolutionRoute = require("./routes/TeamSolution");
const memberInTeamRoute = require('./routes/MemberInTeam')

app.use(express.json());

app.use("/auth", authRoute);
app.use("/api/v1/provinces", provinceRoute);
app.use("/api/v1/schools", schoolRoute);
app.use("/api/v1/students", studentRoute);
app.use("/api/v1/teachers", teacherRoute);
app.use("/api/v1/school-year", schoolYearRoute);
app.use("/api/v1/news", newsRoute);
app.use("/api/v1/programs", programRoute);
app.use("/api/v1/labs", labRoute);
app.use("/api/v1/tutorials", tutorialRoute);
app.use("/api/v1/groups", groupRoute);
app.use("/api/v1/teams", teamRoute);
app.use("/api/v1/members", memberRoute);
app.use("/api/v1/team-solution", teamSolutionRoute);
app.use("/api/v1/member-in-team", memberInTeamRoute);

app.listen(port, () => {
  console.log(`Backend is running at port ${port}`);
});
