const { getPrograms, getProgramById, createProgram, updateProgram, deleteProgram, getProgramsOfTeacher } = require("../controllers/program");
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
 * tags:
 *   name: ProgramList
 *   description: API to get program list
 */

/**
 * @swagger
 * /api/v1/programs:
 *   get:
 *     summary: Returns the list of all the programs
 *     tags: [Programs]
 *     parameters:
 *       - in: query
 *         name: search
 *         description: search by name
 *         schema:
 *           type: string
 *       - in: query
 *         name: page
 *         description: page of program
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         description: limit item per page
 *         schema:
 *           type: integer
 *       - in: query
 *         name: sortField
 *         description: sort field in student 
 *         schema:
 *           type: string
 *       - in: query
 *         name: sortOrder
 *         description: asc or desc
 *         schema:
 *           type: string
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
 * /api/v1/programs/{Id}:
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

/**
 * @swagger
 * /api/v1/programs/program-list/programs-of-a-teacher:
 *   get:
 *     summary: Get all the program of a teacher
 *     tags: [ProgramList]
 *     parameters:
 *       - in: query
 *         name: TeacherId
 *         schema:
 *           type: number
 *         required: true
 *         description: The teacher Id
 *     responses:
 *       200:
 *         description: get all program by teacher id
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                  properties:
 *                      ProgramId:
 *                          type: number
 *                      Description:
 *                          type: string
 *                      Name:
 *                          type: string
 *                      Image:
 *                          type: string        
 *       500:
 *         description: Internal Server Error 
 */

/**
 * @swagger
 * /api/v1/programs:
 *   post:
 *     summary: Create a new program
 *     tags: [Programs]
 *     parameters:
 *       - in: query
 *         name: SchoolYearId
 *         description: ID of the school year
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *      required: true
 *      description: Input name, description and image
 *      content:
 *          application/json:
 *              schema:
 *                  type: object
 *                  properties:
 *                      Name:
 *                          type: string
 *                      Description:
 *                          type: string
 *                      Image:
 *                          type: string
 *     responses:
 *       200:
 *         description: Program created successfully
 *       404:
 *         description: School year not found
 *       500:
 *         description: Internal Server Error 
 */

/**
 * @swagger
 * /api/v1/programs/{Id}:
 *  put:
 *    summary: Update the program by the id
 *    tags: [Programs]
 *    parameters:
 *      - in: path
 *        name: Id
 *        schema:
 *          type: string
 *        required: true
 *        description: The program id
 *    requestBody:
 *      required: true
 *      description: Update name, description and image
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              Name:
 *                  type: string
 *              Description:
 *                  type: string
 *              Image:
 *                  type: string
 *    responses:
 *      200:
 *        description: Program updated successfully
 *      404:
 *        description: Program not found
 *      500:
 *        description: Internal Server Error
 */

/**
 * @swagger
 * /api/v1/programs/{Id}:
 *  delete:
 *    summary: Delete the program by the id
 *    tags: [Programs]
 *    parameters:
 *      - in: path
 *        name: Id
 *        schema:
 *          type: string
 *        required: true
 *        description: The program id
 *    responses:
 *      200:
 *        description: Program deleted successfully
 *      404:
 *        description: Program not found
 *      500:
 *        description: Program Server Error
 */
const router = express.Router();

router.get("/", getPrograms);
router.get("/program-list/programs-of-a-teacher", getProgramsOfTeacher);
router.get("/:Id", getProgramById);
router.post("/", createProgram);
router.put("/:Id", updateProgram);
router.delete("/:Id", deleteProgram);

module.exports = router;