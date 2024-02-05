const express = require("express");
const swaggerUI = require('swagger-ui-express')
const swaggerJsDoc = require('swagger-jsdoc')
const dotenv = require('dotenv').config()

const port = process.env.PORT;
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
				url: process.env.SWAGGER_URL,
			},
		],
	},
	apis: ["./routes/*.js"],
};
const specs = swaggerJsDoc(options);

const app = express();

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

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
