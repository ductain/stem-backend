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
 * /teachers:
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
 * /teachers/{Id}:
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
 * /teachers:
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
 * /teachers/{Id}:
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
 * /teachers/{Id}:
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

module.exports = router;