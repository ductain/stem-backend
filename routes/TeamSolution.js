const express = require('express')
const { getTeamSolutions, getTeamSolutionById, createTeamSolution } = require('../controllers/teamSolution')

const router = express.Router()
router.get('/', getTeamSolutions)
router.get('/:Id', getTeamSolutionById)
router.post('/', createTeamSolution)

module.exports = router