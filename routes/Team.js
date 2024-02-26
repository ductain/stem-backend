const express = require('express');
const { createTeam, updateTeam, deleteTeam, getAllTeamsInGroup } = require('../controllers/team');


/**
 * @swagger
 * components:
 *   schemas:
 *     Team:
 *       type: object
 *       properties:
 *         Id:
 *           type: number
 *           description: id of the Team
 *         TeamName:
 *           type: string
 *           description: name of the team
 *         Members:
 *           type: string
 *           description: number of member in team
 *         GroupId:
 *           type: number
 *           description: id of the group
 */

/**
 * @swagger
 * tags:
 *   name: Teams
 *   description: The Teams managing API
 */

/**
 * @swagger
 * /teams/team-in-group:
 *   get:
 *     summary: Get all teams in a group
 *     tags: [Teams]
 *     parameters:
 *       - in: query
 *         name: GroupId
 *         description: ID of the group
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Team'
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /teams/create:
 *   post:
 *     summary: Create a new team
 *     tags: [Teams]
 *     parameters:
 *       - in: query
 *         name: GroupId
 *         description: ID of the group
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *      required: true
 *      description: Input TeamName and Members
 *      content:
 *          application/json:
 *              schema:
 *                  type: object
 *                  properties:
 *                      TeamName:
 *                          type: string
 *                      Members:
 *                          type: integer
 *     responses:
 *       200:
 *         description: Team created successfully
 *       404:
 *         description: Group not found
 *       500:
 *         description: Internal Server Error 
 */

/**
 * @swagger
 * /teams/{Id}:
 *  put:
 *    summary: Update the team by the id
 *    tags: [Teams]
 *    parameters:
 *      - in: path
 *        name: Id
 *        schema:
 *          type: string
 *          required: true
 *          description: The team id
 *    requestBody:
 *      required: true
 *      description: Update TeamName and Members
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              TeamName:
 *                  type: string
 *              Members:
 *                  type: integer
 *    responses:
 *      200:
 *        description: Team updated successfully
 *      404:
 *        description: Team not found
 *      500:
 *        description: Internal Server Error
 */

/**
 * @swagger
 * /teams/{Id}:
 *  delete:
 *    summary: Delete the team by the id
 *    tags: [Teams]
 *    parameters:
 *      - in: path
 *        name: Id
 *        schema:
 *          type: string
 *          required: true
 *          description: The team id
 *    responses:
 *      200:
 *        description: Team deleted successfully
 *      404:
 *        description: Team not found
 *      500:
 *        description: Internal Server Error
 */
const router = express.Router();

router.get("/team-in-group", getAllTeamsInGroup)
router.post("/create", createTeam);
router.put('/:Id', updateTeam)
router.delete('/:Id', deleteTeam)

module.exports = router;