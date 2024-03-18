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
 * /api/v1/schools:
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
 * /api/v1/schools/{Id}:
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

/**
 * @swagger
 * /api/v1/schools:
 *   post:
 *     summary: Create a new school
 *     tags: [Schools]
 *     requestBody:
 *      required: true
 *      description: Input name
 *      content:
 *          application/json:
 *              schema:
 *                  type: object
 *                  properties:
 *                      Name:
 *                          type: string
 *     responses:
 *       200:
 *         description: Province created successfully
 *       500:
 *         description: Internal Server Error 
 */

/**
 * @swagger
 * /api/v1/schools/{Id}:
 *  put:
 *    summary: Update the school by the id
 *    tags: [Schools]
 *    parameters:
 *      - in: path
 *        name: Id
 *        schema:
 *          type: string
 *          required: true
 *          description: The province id
 *    requestBody:
 *      required: true
 *      description: Update province name
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              Name:
 *                  type: string
 *    responses:
 *      200:
 *        description: Province updated successfully
 *      404:
 *        description: Province not found
 *      500:
 *        description: Internal Server Error
 */

/**
 * @swagger
 * /api/v1/schools/{Id}:
 *  delete:
 *    summary: Delete the school by the id
 *    tags: [Schools]
 *    parameters:
 *      - in: path
 *        name: Id
 *        schema:
 *          type: string
 *          required: true
 *          description: The province id
 *    responses:
 *      200:
 *        description: Province deleted successfully
 *      404:
 *        description: Province not found
 *      500:
 *        description: Internal Server Error
 */
const router = express.Router();

router.get("/", getSchools);
router.get("/:Id", getSchoolById);

module.exports = router;
