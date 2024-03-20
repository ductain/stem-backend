const express = require('express')
const { getTeamSolutions, getTeamSolutionById, createTeamSolution } = require('../controllers/teamSolution')


/**
 * @swagger
 * tags:
 *   name: TeamSolutions
 *   description: The TeamSolutions managing API
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
router.get('/:Id', getTeamSolutionById)
router.post('/', createTeamSolution)

module.exports = router