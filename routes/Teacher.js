const { getTeachers, getTeacherById, getTeachersBySchoolId } = require("../controllers/teacher");
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
 *         SchoolId:
 *           type: number
 *           description: school id of the teacher
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
 * tags:
 *   name: TeachersInSchool
 *   description: API to get all teachers in school
 */

/**
 * @swagger
 * /api/v1/teachers:
 *   get:
 *     summary: Returns the list of all the Teachers
 *     tags: [Teachers]
 *     parameters:
 *       - in: query
 *         name: search
 *         description: search by name and code
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
 *         descrption: sort field by id and name
 *         schema:
 *           type: string
 *       - in: query
 *         name: sortOrder
 *         description: asc or desc
 *         schema:
 *           type: string
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
 * /api/v1/teachers/{Id}:
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

/**
 * @swagger
 * /api/v1/teachers/teacher-list/teachers-in-school:
 *   get:
 *     summary: get all teachers in school
 *     tags: [TeachersInSchool]
 *     parameters:
 *       - in: query
 *         name: SchoolId
 *         schema:
 *           type: number
 *         required: true
 *         description: The school id
 *       - in: query
 *         name: search
 *         description: search by name and code
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
 *         descrption: sort field by id and name
 *         schema:
 *           type: string
 *       - in: query
 *         name: sortOrder
 *         description: asc or desc
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: get all teachers in school
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:        
 *                  $ref: '#/components/schemas/Teacher'
 *       500:
 *         description: Internal Server Error 
 */

/**
 * @swagger
 * /api/v1/teachers:
 *   post:
 *     summary: Create a new teacher
 *     tags: [Teachers]
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
 * /api/v1/teachers/{Id}:
 *  put:
 *    summary: Update the teacher by the id
 *    tags: [Teachers]
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
 * /api/v1/teachers/{Id}:
 *  delete:
 *    summary: Delete the teacher by the id
 *    tags: [Teachers]
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

router.get("/", getTeachers);
router.get("/:Id", getTeacherById);
router.get('/teacher-list/teachers-in-school', getTeachersBySchoolId)

module.exports = router;