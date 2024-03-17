const { getGroups, getGroupById, countGroupsInProgram, createGroup } = require("../controllers/group");
const express = require("express");

/**
 * @swagger
 * components:
 *   schemas:
 *     Group:
 *       type: object
 *       properties:
 *         Id:
 *           type: number
 *           description: id of the Group
 *         GroupCode:
 *           type: string
 *           description: code of the group
 *         GroupName:
 *           type: string
 *           description: name of the Group
 *         TeacherId:
 *           type: number
 *           description: id of the teacher
 *         ProgramId:
 *           type: number
 *           description: id of the program
 *         TeacherCode:
 *           type: string
 *           description: code of the teacher
 *         TeacherName:
 *           type: string
 *           description: name of the teacher
 *         ProgramCode:
 *           type: string
 *           description: code of the program
 *         ProgramName:
 *           type: string
 *           description: name of the program
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     GroupCountResponse:
 *       type: object
 *       properties:
 *         groupCount:
 *           type: integer
 */

/**
 * @swagger
 * tags:
 *   name: Groups
 *   description: The Groups managing API
 */

/**
 * @swagger
 * /groups:
 *   get:
 *     summary: Returns the list of all the Groups
 *     tags: [Groups]
 *     responses:
 *       200:
 *         description: The list of the Groups
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Group'
 *       500:
 *          description: Internal Server Error
 */

/**
 * @swagger
 * /groups/{Id}:
 *   get:
 *     summary: Get the Group by Group code
 *     tags: [Groups]
 *     parameters:
 *       - in: path
 *         name: Id
 *         schema:
 *           type: number
 *         required: true
 *         description: id of the group
 *     responses:
 *       200:
 *         description: The Group description by id
 *         content:
 *           application/json:
 *             schema:        
 *               $ref: '#/components/schemas/Group'
 *       404:
 *         description: Group not found
 *       500:
 *         description: Internal Server Error 
 */

/**
 * @swagger
 * /groups/count/count-by-program:
 *   get:
 *     summary: Get the count of groups in a program
 *     tags: [Groups]
 *     parameters:
 *       - in: query
 *         name: programId
 *         description: ID of the program
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GroupCountResponse'
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /groups:
 *   post:
 *     summary: Create a new group
 *     tags: [Groups]
 *     parameters:
 *       - in: query
 *         name: ProgramId
 *         description: ID of the program
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *      required: true
 *      description: Input Name, TeacherId
 *      content:
 *          application/json:
 *              schema:
 *                  type: object
 *                  properties:
 *                      Name:
 *                          type: string
 *                      TeacherId:
 *                          type: number
 *     responses:
 *       200:
 *         description: Group created successfully
 *       404:
 *         description: Teacher not found
 *       500:
 *         description: Internal Server Error 
 */

/**
 * @swagger
 * /groups/{Id}:
 *  put:
 *    summary: Update the group by the id
 *    tags: [Groups]
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
 * /groups/{Id}:
 *  delete:
 *    summary: Delete the group by the id
 *    tags: [Groups]
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

router.get("/", getGroups);
router.get("/:Id", getGroupById);
router.get('/count/count-by-program', countGroupsInProgram)
router.post("/", createGroup);

module.exports = router;