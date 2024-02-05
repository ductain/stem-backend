const { getPrograms, getProgramById } = require("../controllers/program");
const express = require("express");

/**
 * @swagger
 * components:
 *   schemas:
 *     Program:
 *       type: object
 *       properties:
 *         Id:
 *           type: number
 *           description: id of the program
 *         Code:
 *           type: string
 *           description: Code of the program
 *         Name:
 *           type: string
 *           description: name of the program
 *         Description:
 *           type: string
 *           description: detail of the program
 *         Image:
 *           type: string
 *           description: url of image
 *         CreatedDate:
 *           type: string
 *           format: date-time
 *           description: create date of the program
 *         UpdatedDate:
 *           type: string
 *           format: date-time
 *           description: update date of the program
 *         SchoolYearId:
 *           type: number
 *           description: id of the school year
 *         StartDate:
 *           type: string
 *           format: date-time
 *           description: start date of the school year
 *         EndDate:
 *           type: string
 *           format: date-time
 *           description: end date of the school year
 */

/**
 * @swagger
 * tags:
 *   name: Programs
 *   description: The programs managing API
 */

/**
 * @swagger
 * /program:
 *   get:
 *     summary: Returns the list of all the programs
 *     tags: [Programs]
 *     responses:
 *       200:
 *         description: The list of the programs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Program'
 *       500:
 *          description: Internal Server Error
 */

/**
 * @swagger
 * /program/{Id}:
 *   get:
 *     summary: Get the program by id
 *     tags: [Programs]
 *     parameters:
 *       - in: path
 *         name: Id
 *         schema:
 *           type: string
 *         required: true
 *         description: The program Id
 *     responses:
 *       200:
 *         description: The program description by id
 *         content:
 *           application/json:
 *             schema:        
 *               $ref: '#/components/schemas/Program'
 *       404:
 *         description: program not found
 *       500:
 *         description: Internal Server Error 
 */
const router = express.Router();

router.get("/", getPrograms);
router.get("/:Id", getProgramById);

module.exports = router;