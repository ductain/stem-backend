const { getSchoolYear, getSchoolYearById, createSchoolYear, updateSchoolYear, deleteSchoolYear } = require("../controllers/schoolYear");
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
 * /api/v1/school-year:
 *   get:
 *     summary: Returns the list of all the SchoolYears
 *     tags: [SchoolYears]
 *     parameters:
 *       - in: query
 *         name: search
 *         description: search by start date or end date
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
 *         description: sort field by id or start date or end date
 *         schema:
 *           type: string
 *       - in: query
 *         name: sortOrder
 *         description: asc or desc
 *         schema:
 *           type: string
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
 * /api/v1/school-year/{Id}:
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

/**
 * @swagger
 * /api/v1/school-year:
 *   post:
 *     summary: Create a new SchoolYears
 *     tags: [SchoolYears]
 *     requestBody:
 *      required: true
 *      description: Input start date
 *      content:
 *          application/json:
 *              schema:
 *                  type: object
 *                  properties:
 *                      StartDate:
 *                          type: string
 *                          format: date-time
 *     responses:
 *       200:
 *         description: School year created successfully
 *       500:
 *         description: Internal Server Error 
 */

/**
 * @swagger
 * /api/v1/school-year/{Id}:
 *  put:
 *    summary: Update the SchoolYears by the id
 *    tags: [SchoolYears]
 *    parameters:
 *      - in: path
 *        name: Id
 *        schema:
 *          type: string
 *          required: true
 *          description: The school year id
 *    requestBody:
 *      required: true
 *      description: Update start date
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              StartDate:
 *                  type: string
 *                  format: date-time
 *    responses:
 *      200:
 *        description: School year updated successfully
 *      404:
 *        description: School year not found
 *      500:
 *        description: Internal Server Error
 */

/**
 * @swagger
 * /api/v1/school-year/{Id}:
 *  delete:
 *    summary: Delete the SchoolYears by the id
 *    tags: [SchoolYears]
 *    parameters:
 *      - in: path
 *        name: Id
 *        schema:
 *          type: string
 *          required: true
 *          description: The school year id
 *    responses:
 *      200:
 *        description: School year deleted successfully
 *      404:
 *        description: School year not found
 *      500:
 *        description: Internal Server Error
 */
const router = express.Router();

router.get("/", getSchoolYear);
router.get("/:Id", getSchoolYearById);
router.post("/", createSchoolYear);
router.put("/:Id", updateSchoolYear);
router.delete("/:Id", deleteSchoolYear);

module.exports = router;