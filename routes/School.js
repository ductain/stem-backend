const { getSchools, getSchoolById } = require("../controllers/school");
const express = require("express");

/**
 * @swagger
 * components:
 *   schemas:
 *     School:
 *       type: object
 *       properties:
 *         Id:
 *           type: number
 *           description: id of the School
 *         ProvinceCode:
 *           type: string
 *           description: code of the province
 *         ProvinceId:
 *           type: number
 *           description: id of the province
 *         ProvinceName:
 *           type: string
 *           description: name of the province
 *         SchoolCode:
 *           type: string
 *           description: Code of the School
 *         SchoolName:
 *           type: string
 *           description: name of the School
 *         Address:
 *           type: string
 *           description: address of the School
 */

/**
 * @swagger
 * tags:
 *   name: Schools
 *   description: The Schools managing API
 */

/**
 * @swagger
 * /school:
 *   get:
 *     summary: Returns the list of all the Schools
 *     tags: [Schools]
 *     responses:
 *       200:
 *         description: The list of the Schools
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/School'
 *       500:
 *          description: Internal Server Error
 */

/**
 * @swagger
 * /school/{Id}:
 *   get:
 *     summary: Get the School by id
 *     tags: [Schools]
 *     parameters:
 *       - in: path
 *         name: Id
 *         schema:
 *           type: string
 *         required: true
 *         description: The school Id
 *     responses:
 *       200:
 *         description: The School description by id
 *         content:
 *           application/json:
 *             schema:        
 *               $ref: '#/components/schemas/School'
 *       404:
 *         description: School not found
 *       500:
 *         description: Internal Server Error 
 */
const router = express.Router();

router.get("/", getSchools);
router.get("/:Id", getSchoolById);

module.exports = router;
