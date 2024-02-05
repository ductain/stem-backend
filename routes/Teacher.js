const { getTeachers, getTeacherById } = require("../controllers/teacher");
const express = require("express");

/**
 * @swagger
 * components:
 *   schemas:
 *     Teacher:
 *       type: object
 *       properties:
 *         Id:
 *           type: number
 *           description: id of the teacher
 *         TeacherCode:
 *           type: string
 *           description: code of the teacher
 *         TeacherName:
 *           type: string
 *           description: name of the teacher
 *         Email:
 *           type: string
 *           description: email of the teacher
 *         Gender:
 *           type: boolean
 *           description: gender of the teacher
 *         DateOfBirth:
 *           type: string
 *           format: date-time
 *           description: teacher's date of birth
 *         Address:
 *           type: string
 *           description: address of the teacher
 *         SchoolCode:
 *           type: string
 *           description: code of the school
 *         SchoolName:
 *           type: string
 *           description: name of the school
 */

/**
 * @swagger
 * tags:
 *   name: Teachers
 *   description: The teachers managing API
 */

/**
 * @swagger
 * /teacher:
 *   get:
 *     summary: Returns the list of all the Teachers
 *     tags: [Teachers]
 *     responses:
 *       200:
 *         description: The list of the teachers
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Teacher'
 *       500:
 *          description: Internal Server Error
 */

/**
 * @swagger
 * /teacher/{Id}:
 *   get:
 *     summary: Get the teacher by teacher id
 *     tags: [Teachers]
 *     parameters:
 *       - in: path
 *         name: Id
 *         schema:
 *           type: number
 *         required: true
 *         description: The teacher id
 *     responses:
 *       200:
 *         description: The teacher description by teacher id
 *         content:
 *           application/json:
 *             schema:        
 *               $ref: '#/components/schemas/Teacher'
 *       404:
 *         description: Teacher not found
 *       500:
 *         description: Internal Server Error 
 */
const router = express.Router();

router.get("/", getTeachers);
router.get("/:Id", getTeacherById);

module.exports = router;