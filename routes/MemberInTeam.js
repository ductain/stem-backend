const express = require("express");
const {
  getAllMembersInTeam,
  addMemberIntoTeam,
} = require("../controllers/memberInTeam");

/**
 * @swagger
 * tags:
 *   name: MembersInTeam
 *   description: members in team
 */

/**
 * @swagger
 * /api/v1/member-in-team:
 *   get:
 *     summary: Get all members in the team
 *     tags: [MembersInTeam]
 *     parameters:
 *       - in: query
 *         name: TeamId
 *         schema:
 *           type: number
 *         required: true
 *         description: id of the team
 *     responses:
 *       200:
 *         description: get all member by team id
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                  properties:
 *                      MemberId:
 *                          type: number
 *                      StudentCode:
 *                          type: string
 *                      ClassCode:
 *                          type: string
 *                      FullName:
 *                          type: string
 *                      TeamId:
 *                          type: number
 *                      TeamName:
 *                          type: string
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /api/v1/member-in-team:
 *  post:
 *    summary: add member into team
 *    tags: [MembersInTeam]
 *    parameters:
 *      - in: query
 *        name: MemberId
 *        schema:
 *          type: number
 *        required: true
 *        description: The member id
 *    requestBody:
 *      required: true
 *      description: add member into team
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *               TeamId:
 *                  type: number
 *    responses:
 *      200:
 *        description: Member added successfully
 *      404:
 *        description: Member not found
 *      500:
 *        description: Internal Server Error
 */
const router = express.Router();

router.get("/", getAllMembersInTeam);
router.post("/", addMemberIntoTeam);

module.exports = router;
