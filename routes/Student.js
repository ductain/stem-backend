const { getStudents } = require("../controllers/student");
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
 * /api/v1/students:
 *   get:
 *     summary: Returns the list of all the Students
 *     tags: [Students]
 *     parameters:
 *       - in: query
 *         name: search
 *         description: search by name
 *         schema:
 *           type: string
 *       - in: query
 *         name: page
 *         description: page of student
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         description: limit item per page
 *         schema:
 *           type: integer
 *       - in: query
 *         name: sortField
 *         descrption: sort field in student 
 *         schema:
 *           type: string
 *       - in: query
 *         name: sortOrder
 *         description: asc or desc
 *         schema:
 *           type: string
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
 * /api/v1/students:
 *   post:
 *     summary: Create a new student
 *     tags: [Students]
 *     requestBody:
 *      required: true
 *      description: Input name
 *      content:
 *          application/json:
 *              schema:
 *                  type: object
 *                  properties:
 *                      Name:
 *                          type: string
 *     responses:
 *       200:
 *         description: Province created successfully
 *       500:
 *         description: Internal Server Error 
 */

/**
 * @swagger
 * /api/v1/students/{Id}:
 *  put:
 *    summary: Update the student by the id
 *    tags: [Students]
 *    parameters:
 *      - in: path
 *        name: Id
 *        schema:
 *          type: string
 *          required: true
 *          description: The province id
 *    requestBody:
 *      required: true
 *      description: Update province name
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              Name:
 *                  type: string
 *    responses:
 *      200:
 *        description: Province updated successfully
 *      404:
 *        description: Province not found
 *      500:
 *        description: Internal Server Error
 */


/**
 * @swagger
 * /api/v1/students/{Id}:
 *  delete:
 *    summary: Delete the student by the id
 *    tags: [Students]
 *    parameters:
 *      - in: path
 *        name: Id
 *        schema:
 *          type: string
 *          required: true
 *          description: The province id
 *    responses:
 *      200:
 *        description: Province deleted successfully
 *      404:
 *        description: Province not found
 *      500:
 *        description: Internal Server Error
 */
const router = express.Router();

router.get("/", getStudents);

module.exports = router;