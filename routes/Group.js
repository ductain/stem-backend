const { getGroups, getGroupById, countGroupsInProgram, createGroup, getGroupByProgramId, getAvailableGroupsInSchool, getGroupOfATeacherInProgram } = require("../controllers/group");
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
 * /api/v1/groups:
 *   get:
 *     summary: Returns the list of all the Groups
 *     tags: [Groups]
 *     parameters:
 *       - in: query
 *         name: search
 *         description: search by group name, group code
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
 *         descrption: sort field in group 
 *         schema:
 *           type: string
 *       - in: query
 *         name: sortOrder
 *         description: asc or desc
 *         schema:
 *           type: string
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
 * /api/v1/groups/group-list/groups-of-a-program:
 *   get:
 *     summary: Get all Groups by program id
 *     tags: [Groups]
 *     parameters:
 *       - in: query
 *         name: ProgramId
 *         schema:
 *           type: number
 *         required: true
 *         description: id of the program
 *       - in: query
 *         name: search
 *         description: search by group name, group code
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
 *         descrption: sort field in group 
 *         schema:
 *           type: string
 *       - in: query
 *         name: sortOrder
 *         description: asc or desc
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: get all groups by program id
 *         content:
 *           application/json:
 *             schema:        
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Group'
 *       404:
 *         description: Group not found
 *       500:
 *         description: Internal Server Error 
 */

/**
 * @swagger
 * /api/v1/groups/group-list/groups-of-a-teacher:
 *   get:
 *     summary: Get all Groups of a teacher
 *     tags: [Groups]
 *     parameters:
 *       - in: query
 *         name: ProgramId
 *         schema:
 *           type: number
 *         required: true
 *         description: id of the program
 *       - in: query
 *         name: TeacherId
 *         schema:
 *           type: number
 *         required: true
 *         description: id of the teacher
 *       - in: query
 *         name: search
 *         description: search by group name, group code
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
 *         descrption: sort field in group 
 *         schema:
 *           type: string
 *       - in: query
 *         name: sortOrder
 *         description: asc or desc
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: get all groups of teacher
 *         content:
 *           application/json:
 *             schema:        
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Group'
 *       404:
 *         description: Group not found
 *       500:
 *         description: Internal Server Error 
 */

/**
 * @swagger
 * /api/v1/groups/{Id}:
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
 * /api/v1/groups/group-list/available-groups-in-school:
 *   get:
 *     summary: Get all the groups available in school of a specific program
 *     tags: [Groups]
 *     parameters:
 *       - in: query
 *         name: SchoolId
 *         schema:
 *           type: number
 *         required: true
 *         description: school id
 *       - in: query
 *         name: ProgramId
 *         schema:
 *           type: number
 *         required: true
 *         description: program id
 *       - in: query
 *         name: search
 *         description: search by group name, group code
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
 *         descrption: sort field in group 
 *         schema:
 *           type: string
 *       - in: query
 *         name: sortOrder
 *         description: asc or desc
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: get all available groups in school of a specific program
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                  properties:        
 *                      Id:
 *                          type: number
 *                      GroupCode:
 *                          type: string
 *                      Name:
 *                          type: string
 *       500:
 *         description: Internal Server Error 
 */

/**
 * @swagger
 * /api/v1/groups:
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
 *         content:
 *          application/json:
 *              schema:
 *                  type: object
 *                  properties:
 *                      Id:
 *                          type: number
 *                      Code:
 *                          type: string
 *                      Name:
 *                          type: string
 *                      Status:
 *                          type: number
 *                      ProgramId:
 *                          type: number
 *                      TeacherId:
 *                          type: number
 *       404:
 *         description: Teacher not found
 *       500:
 *         description: Internal Server Error 
 */

/**
 * @swagger
 * /api/v1/groups/{Id}:
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
 * /api/v1/groups/{Id}:
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
router.get("/group-list/groups-of-a-program", getGroupByProgramId);
router.get("/group-list/groups-of-a-teacher", getGroupOfATeacherInProgram);
router.get("/group-list/available-groups-in-school", getAvailableGroupsInSchool);
router.post("/", createGroup);

module.exports = router;