const { getSchoolYear, getSchoolYearById } = require("../controllers/schoolYear");
const express = require("express");

/**
 * @swagger
 * components:
 *   schemas:
 *     SchoolYear:
 *       type: object
 *       properties:
 *         Id:
 *           type: number
 *           description: id of the SchoolYear
 *         StartDate:
 *           type: string
 *           format: date-time
 *           description: start date of the SchoolYear
 *         EndDate:
 *           type: string
 *           format: date-time
 *           description: end date of the SchoolYear
 */

/**
 * @swagger
 * tags:
 *   name: SchoolYears
 *   description: The SchoolYears managing API
 */

/**
 * @swagger
 * /schoolYear:
 *   get:
 *     summary: Returns the list of all the SchoolYears
 *     tags: [SchoolYears]
 *     responses:
 *       200:
 *         description: The list of the SchoolYears
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/SchoolYear'
 *       500:
 *          description: Internal Server Error
 */

/**
 * @swagger
 * /schoolYear/{Id}:
 *   get:
 *     summary: Get the SchoolYear by id
 *     tags: [SchoolYears]
 *     parameters:
 *       - in: path
 *         name: Id
 *         schema:
 *           type: string
 *         required: true
 *         description: The SchoolYear Id
 *     responses:
 *       200:
 *         description: The SchoolYear description by id
 *         content:
 *           application/json:
 *             schema:        
 *               $ref: '#/components/schemas/SchoolYear'
 *       404:
 *         description: SchoolYear not found
 *       500:
 *         description: Internal Server Error 
 */
const router = express.Router();

router.get("/", getSchoolYear);
router.get("/:Id", getSchoolYearById);

module.exports = router;