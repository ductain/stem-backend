const { getStudents, getStudentByStudentCode } = require("../controllers/student");
const express = require("express");

/**
 * @swagger
 * components:
 *   schemas:
 *     Student:
 *       type: object
 *       properties:
 *         Id:
 *           type: number
 *           description: id of the Student
 *         SchoolYearId:
 *           type: number
 *           description: school year of the student
 *         StudentCode:
 *           type: string
 *           description: code of the Student
 *         FullName:
 *           type: string
 *           description: full name of the student
 *         Email:
 *           type: string
 *           description: email of the student
 *         ClassCode:
 *           type: string
 *           description: class of the student
 *         SchoolName:
 *           type: string
 *           description: name of the school
 *         DateOfBirth:
 *           type: string
 *           format: date-time
 *           description: date of birth
 *         Gender:
 *           type: boolean
 *           description: gender of the student, true mean male, false mean female
 *         StudentAddress:
 *           type: string
 *           description: address of the student
 */

/**
 * @swagger
 * tags:
 *   name: Students
 *   description: The Students managing API
 */

/**
 * @swagger
 * /student:
 *   get:
 *     summary: Returns the list of all the Students
 *     tags: [Students]
 *     responses:
 *       200:
 *         description: The list of the Students
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Student'
 *       500:
 *          description: Internal Server Error
 */

/**
 * @swagger
 * /student/{StudentCode}:
 *   get:
 *     summary: Get the Student by student code
 *     tags: [Students]
 *     parameters:
 *       - in: path
 *         name: StudentCode
 *         schema:
 *           type: string
 *         required: true
 *         description: The student code STDxxx. Ex STD100
 *     responses:
 *       200:
 *         description: The student description by student code
 *         content:
 *           application/json:
 *             schema:        
 *               $ref: '#/components/schemas/Student'
 *       404:
 *         description: Student not found
 *       500:
 *         description: Internal Server Error 
 */
const router = express.Router();

router.get("/", getStudents);
router.get("/:StudentCode", getStudentByStudentCode);

module.exports = router;