const express = require("express");
const { getMembersInGroup } = require("../controllers/member");


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
const router = express.Router();

router.get("/member-in-group", getMembersInGroup);

module.exports = router;