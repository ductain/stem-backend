const express = require('express')
const { getTeamSolutions, getTeamSolutionById, createTeamSolution, getTeamSolutionsByTeamId } = require('../controllers/teamSolution')

/**
 * @swagger
 * components:
 *   schemas:
 *     TeamSolution:
 *       type: object
 *       properties:
 *         Id:
 *           type: number
 *           description: id of the team solution
 *         Solution:
 *           type: string
 *           description: solution of the team solution
 *         Score:
 *           type: number
 *           description: score of the team solution
 *         CreateDate:
 *           type: string
 *           format: date-time
 *           description: create date of the team solution
 *         UpdateDate:
 *           type: string
 *           format: date-time
 *           description: update date of the team solution
 *         LabId:
 *           type: number
 *           description: lab id of the team solution
 *         Topic:
 *           type: string
 *           description: topic of the team solution
 *         Description:
 *           type: string
 *           description: description of the team solution
 *         TeamId:
 *           type: number
 *           description: team id of the team solution
 *         TeamName:
 *           type: string
 *           description: team name of the team solution
 */

/**
 * @swagger
 * tags:
 *   name: TeamSolutions
 *   description: The TeamSolutions managing API
 */

/**
 * @swagger
 * /api/v1/team-solution:
 *   get:
 *     summary: Returns the list of all the team solution
 *     tags: [TeamSolutions]
 *     parameters:
 *       - in: query
 *         name: search
 *         description: search by topic of lab
 *         schema:
 *           type: string
 *       - in: query
 *         name: page
 *         description: page of team solution
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         description: limit item per page
 *         schema:
 *           type: integer
 *       - in: query
 *         name: sortField
 *         descrption: sort field in team solution 
 *         schema:
 *           type: string
 *       - in: query
 *         name: sortOrder
 *         description: asc or desc
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The list of the team solutions
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/TeamSolution'
 *       500:
 *          description: Internal Server Error
 */

/**
 * @swagger
 * /api/v1/team-solution/team-solution-list/solutions-of-team:
 *   get:
 *     summary: Returns the list include all the team solution in team
 *     tags: [TeamSolutions]
 *     parameters:
 *       - in: query
 *         name: TeamId
 *         description: team id
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: The list of the team solutions
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/TeamSolution'
 *       500:
 *          description: Internal Server Error
 */

/**
 * @swagger
 * /api/v1/team-solution/{Id}:
 *   get:
 *     summary: Get the team solution by id
 *     tags: [TeamSolutions]
 *     parameters:
 *       - in: path
 *         name: Id
 *         schema:
 *           type: string
 *         required: true
 *         description: The team solution Id
 *     responses:
 *       200:
 *         description: The team solution description by id
 *         content:
 *           application/json:
 *             schema:        
 *               $ref: '#/components/schemas/TeamSolution'
 *       404:
 *         description: team solution not found
 *       500:
 *         description: Internal Server Error 
 */

/**
 * @swagger
 * /api/v1/team-solution:
 *   post:
 *     summary: Create a new team solution
 *     tags: [TeamSolutions]
 *     parameters:
 *       - in: query
 *         name: LabId
 *         description: ID of the lab
 *         required: true
 *         schema:
 *           type: integer
 *       - in: query
 *         name: TeamId
 *         description: ID of the team
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *      required: true
 *      description: Input solution
 *      content:
 *          application/json:
 *              schema:
 *                  type: object
 *                  properties:
 *                      Solution:
 *                          type: string
 *     responses:
 *       200:
 *         description: Team solution created successfully
 *       404:
 *         description: Team not found
 *       500:
 *         description: Internal Server Error 
 */
const router = express.Router()
router.get('/', getTeamSolutions)
router.get('/team-solution-list/solutions-of-team', getTeamSolutionsByTeamId)
router.get('/:Id', getTeamSolutionById)
router.post('/', createTeamSolution)

module.exports = router