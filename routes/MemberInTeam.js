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
const router = express.Router();

router.get("/", getAllMembersInTeam);
router.post("/", addMemberIntoTeam);

module.exports = router;
