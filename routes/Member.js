const express = require("express");
const { getMembersInGroup, getProgramsOfAMember, createMember, getAvailableProgramsOfAMember } = require("../controllers/member");


/**
 * @swagger
 * components:
 *   schemas:
 *    Member:
 *       type: object
 *       properties:
 *         Id:
 *           type: number
 *           description: id of the member
 *         GroupId:
 *           type: number
 *           description: id of the group
 *         GroupCode:
 *           type: string
 *           description: code of the group
 *         Name:
 *           type: string
 *           description: name of the group
 *         SchoolId:
 *           type: string
 *           description: id of the school
 *         StudentId:
 *           type: string
 *           description: id of the student
 *         StudentCode:
 *           type: string
 *           description: code of the student
 *         FullName:
 *           type: string
 *           description: name of the student
 */

/**
 * @swagger
 * tags:
 *   name: Members
 *   description: The Members managing API
 */

/**
 * @swagger
 * /members/member-in-group:
 *   get:
 *     summary: Get all members in the group
 *     tags: [Members]
 *     parameters:
 *       - in: query
 *         name: GroupId
 *         schema:
 *           type: number
 *         required: true
 *         description: id of the group
 *     responses:
 *       200:
 *         description: get all member by group id
 *         content:
 *           application/json:
 *             schema:        
 *               $ref: '#/components/schemas/Member'
 *       404:
 *         description: Member not found
 *       500:
 *         description: Internal Server Error 
 */

/**
 * @swagger
 * /members/programs-of-a-student:
 *   get:
 *     summary: Get all program in a member
 *     tags: [Members]
 *     parameters:
 *       - in: query
 *         name: StudentId
 *         schema:
 *           type: number
 *         required: true
 *         description: id of the student
 *     responses:
 *       200:
 *         description: get all program of a member
 *         content:
 *           application/json:
 *             schema:        
 *               type: object
 *               properties:
 *                      Id:
 *                          type: number
 *                      StudentId:
 *                          type: number
 *                      ClassCode:
 *                          type: string
 *                      FullName:
 *                          type: string
 *                      ProgramId:
 *                          type: number
 *                      ProgramCode:
 *                          type: string
 *                      ProgramName:
 *                          type: string
 *                      SchoolYearId:
 *                          type: number
 *                      CreatedDate:
 *                          type: string
 *                          format: date-time
 *                      UpdatedDate:
 *                          type: string
 *                          format: date-time
 *                      Description:
 *                          type: string
 *                      Image:
 *                          type: string
 *       404:
 *         description: Member not found
 *       500:
 *         description: Internal Server Error 
 */

/**
 * @swagger
 * /members/available-programs-of-a-student:
 *   get:
 *     summary: Get all available program that member not errolled
 *     tags: [Members]
 *     parameters:
 *       - in: query
 *         name: StudentId
 *         schema:
 *           type: number
 *         required: true
 *         description: id of the student
 *     responses:
 *       200:
 *         description: Get all available program that member not errolled
 *         content:
 *           application/json:
 *             schema:        
 *               type: object
 *               properties:
 *                      Id:
 *                          type: number
 *                      StudentId:
 *                          type: number
 *                      ClassCode:
 *                          type: string
 *                      FullName:
 *                          type: string
 *                      ProgramId:
 *                          type: number
 *                      ProgramCode:
 *                          type: string
 *                      ProgramName:
 *                          type: string
 *                      SchoolYearId:
 *                          type: number
 *                      CreatedDate:
 *                          type: string
 *                          format: date-time
 *                      UpdatedDate:
 *                          type: string
 *                          format: date-time
 *                      Description:
 *                          type: string
 *                      Image:
 *                          type: string
 *       404:
 *         description: Member not found
 *       500:
 *         description: Internal Server Error 
 */

/**
 * @swagger
 * /members:
 *   post:
 *     summary: Create a new member into program
 *     tags: [Members]
 *     parameters:
 *       - in: query
 *         name: ProgramId
 *         description: ID of the program that exist
 *         required: true
 *         schema:
 *           type: integer
 *       - in: query
 *         name: StudentId
 *         description: ID of the student to be added to the program
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Member created successfully
 *       404:
 *         description: Member not found
 *       500:
 *         description: Internal Server Error 
 */
const router = express.Router();

router.get("/member-in-group", getMembersInGroup);
router.get("/programs-of-a-student", getProgramsOfAMember);
router.get("/available-programs-of-a-student", getAvailableProgramsOfAMember);
router.post("/", createMember);

module.exports = router;