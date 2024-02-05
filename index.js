const express = require("express");
const swaggerUI = require('swagger-ui-express')
const swaggerJsDoc = require('swagger-jsdoc')
const dotenv = require('dotenv').config()
const cors = require('cors')
const port = process.env.PORT || 5000;
const CSS_URL = "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui.min.css";
const JS_URL = "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui-bundle.min.js";
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
				url: 'http://localhost:5000',
			},
			{
				url: 'https://stem-backend.vercel.app/',
			},
		],
	},
	apis: ["./routes/*.js"],
};
const specs = swaggerJsDoc(options);

const app = express();
app.use(cors())

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs, { customCssUrl: CSS_URL, customJsUrl: JS_URL }));

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
